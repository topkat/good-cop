

import { formatAndValidate } from './helpers/formatAndValidateForDefinition.js'
import { triggerOnObjectType } from './helpers/triggerOnObjectType.js'
import { Definition } from './DefinitionClass.js'
import { findTypeInDefinitions, getFieldValueForDefinitions } from './helpers/findInDefinitions.js'

import { GoodCopDefinitionPartial, DefinitionObjChild, GoodCopDefinitionPartialFn, GoodCopProvidedModels, GoodCopMainTypes, SwaggerSchema } from './definitionTypes.js'

import { asArray } from 'topkat-utils'

export class DefinitionBase {
    isRequired?: boolean | undefined
    _refValue?: string | undefined
    /** used to store models for model() and ref() definitions */
    _definitions = [] as (GoodCopDefinitionPartial | GoodCopDefinitionPartialFn)[] // may be used somewhere outside the class
    protected getModels? = (() => ({})) as () => GoodCopProvidedModels
    // protected _flatObjectCacheWithoutArraySyntax: Record<string, Definition> | undefined
    constructor(definitions?: GoodCopDefinitionPartial | GoodCopDefinitionPartial[], previousThis?: DefinitionBase) {
        if (previousThis) {
            // this._arrOrObjCache = previousThis._arrOrObjCache
            this._refValue = previousThis._refValue as any
            this._definitions = [...previousThis._definitions]
        }
        if (definitions) {
            for (const definition of asArray(definitions)) {
                this._pushNewDef(definition, false)
            }
            this._definitions.sort((a, b) => (a as any).priority - (b as any).priority)
        }
    }
    _pushNewDef(definition: GoodCopDefinitionPartial, doSort = true) {
        // default values
        if (typeof definition.priority !== 'number') definition.priority = 50

        this._definitions.push(definition)

        if (definition.ref) this._refValue = definition.ref as any
        if (typeof definition.required === 'boolean') this.isRequired = definition.required

        if (doSort) this._definitions.sort((a, b) => (a as any).priority - (b as any).priority)
    }
    /** @returns formatted result */
    formatAndValidate = formatAndValidate
    _getObjectCache(): DefinitionObjChild | undefined {
        const definitions = this._definitions

        for (const def of definitions) {
            const { objectCache } = typeof def === 'function' ? def() : def
            if (objectCache) return objectCache
        }
    }

    /** for all definitions of the object (eg [string, required]) it will find a defined value and return when the value is met the first time. Eg: for a value of 'isRequired', it will check all definitions for the first containing that field and return it's value */
    getDefinitionValue<K extends keyof GoodCopDefinitionPartial>(name: K): (GoodCopDefinitionPartial[K] | void) {
        return getFieldValueForDefinitions(this._definitions, name)
    }
    getName() {
        return getFieldValueForDefinitions(this._definitions, 'paramName')
    }
    getMainType() {
        return this.getDefinitionValue('mainType')
    }
    isType(type: GoodCopMainTypes) {
        return findTypeInDefinitions(this._definitions, type)
    }
    getTsTypeAsString(depth = 0) {
        const definitions = this._definitions

        const output = { read: 'any' } as { read: string, write: string }

        for (const defRaw of definitions) {
            const def = typeof defRaw === 'function' ? defRaw() : defRaw
            for (const readOrWriteType of ['tsTypeStr', 'tsTypeStrForWrite'] as const) {
                const isRead = readOrWriteType === 'tsTypeStr'
                const typeInDef = def[readOrWriteType]
                const readOrWrite = isRead ? 'read' : 'write'
                if (typeInDef) {
                    output[readOrWrite] = typeof typeInDef === 'function' ? typeInDef(isRead ? output.read : output.write || output.read, depth) : typeInDef
                }
            }
        }

        if (typeof output.write === 'undefined') output.write = output.read

        return output
    }
    /** Get Swagger type object for this definition */
    getSwaggerType(depth = 0) {
        const swaggerDef = this.getDefinitionValue('swaggerType')
        const swDef = (typeof swaggerDef === 'function' ? swaggerDef(depth) : swaggerDef)
        if (swDef) swDef.example = this.getExampleValue()
        return swDef || { type: {} } as SwaggerSchema
    }
    getExampleValue(
        /** Keep track of recursive executions internally for security and performance purposes */
        depth = 0
    ) {
        const exempleVal = this.getDefinitionValue('exempleValue')
        return typeof exempleVal === 'function' ? exempleVal(depth) : exempleVal
    }
    /** This is a helper that will get any object definition to its flat version (with dot notation for subobjects) with a replacer callback.
    * ```ts
    * _getDefinitionObjFlat({
    *       a: {
    *         b: { c: Definition }, 
    *         d: Definition
    *       }, 
    *       e: Definition
    *     },
    *     item => 'replaced'
    * })
    * ```
    * * Will become:
    * ```ts
    * { 
    *   'a.b.c': 'replaced',
    *   'a.d': 'replaced',
    *   e: 'replaced'
    * }
    * ```
    */
    _getDefinitionObjFlat<T = Definition>(
        /** This option will remove 'myObj.myArr[0].item' => 'myObj.myArr.item' */
        removeArrayBracketsNotation = false,
        onDefinition: (def: Definition) => T = (def: Definition) => def as T,
        addr = '',
        objFlat = {},
        /** Keep track of recursive executions for security */
        depth = 0
    ): Record<string, T> {
        const obj = this._getObjectCache()
        if (obj) return _getDefinitionObjFlat(removeArrayBracketsNotation, onDefinition, obj, addr, objFlat, depth)
        else return {}
    }
}

function _getDefinitionObjFlat<T = Definition>(
    this: Definition | any,
    removeArrayBracketsNotation = false,
    /** Returning falsey value will write nothing in flat model */
    onDefinition: (def: Definition) => T = (def: Definition) => def as T,
    parentValue,
    addr = '',
    flatObj: Record<string, Definition> = {},
    depth: number,
): Record<string, T> {
    // TODO avoid making a recursive function at each reads
    // if (!removeArrayBracketsNotation && this?._flatObjectCache) return this?._flatObjectCache
    // if (removeArrayBracketsNotation && this?._flatObjectCacheWithoutArraySyntax) return this?._flatObjectCacheWithoutArraySyntax
    triggerOnObjectType('_getDefinitionObjFlat', parentValue, {
        onArrayItem(item, i) {
            _getDefinitionObjFlat(removeArrayBracketsNotation, onDefinition, item, addr + (removeArrayBracketsNotation ? '' : `[${i}]`), flatObj, depth)
        },
        onObjectItem(value, key) {
            _getDefinitionObjFlat(removeArrayBracketsNotation, onDefinition, value, addr ? addr + `.${key}` : key, flatObj, depth + 1)
        },
        onDefinition(definition) {
            const returnValue = onDefinition(definition)
            if (returnValue) flatObj[addr] = returnValue as any
            definition._getDefinitionObjFlat(removeArrayBracketsNotation, onDefinition, addr, flatObj, depth + 1)
        },
    }, depth + 1)
    return flatObj as Record<string, T>
}