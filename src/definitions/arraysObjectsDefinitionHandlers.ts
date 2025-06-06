

import { Definition } from '../DefinitionClass.js'
import { validateDefinitionPartials } from '../helpers/formatAndValidateForDefinition.js'
import { defaultTypeError } from '../helpers/definitionGenericHelpers.js'
import { GoodCopDefCtx, GoodCopDefinitionPartial, DefinitionObjChild, SwaggerSchema } from '../definitionTypes.js'
import { triggerOnObjectTypeAsync, triggerOnObjectType } from '../helpers/triggerOnObjectType.js'

import { isObject, forI } from 'topkat-utils'

//----------------------------------------
// VALIDATORS
//----------------------------------------
const arrDefPartials: GoodCopDefinitionPartial = {
    name: 'array',
    mainType: 'array',
    errorMsg: defaultTypeError('array'),
    // validate: ctx => Array.isArray(ctx.value),
}

const objDefPartials: GoodCopDefinitionPartial = {
    name: 'object',
    mainType: 'object',
    errorMsg: defaultTypeError('object'),
    // validate: ctx => isObject(ctx.value),
}

export function getArrObjDef(
    objOrArr,
    type: 'object' | 'array',
    config?: { deleteForeignKeys: boolean }
) {
    return {
        ...(type === 'object' ? objDefPartials : arrDefPartials),
        validateBeforeFormatting: async ctx => {
            const maincheck = type === 'object' ? isObject(ctx.value) : Array.isArray(ctx.value)
            return maincheck && await formatAndValidateRecursive(ctx, objOrArr, ctx.value, ctx.fieldAddr, true, true, false, config?.deleteForeignKeys)
        },
        validate: async ctx => {
            const maincheck = type === 'object' ? isObject(ctx.value) : Array.isArray(ctx.value)
            return maincheck && await formatAndValidateRecursive(ctx, objOrArr, ctx.value, ctx.fieldAddr, true, false, true, config?.deleteForeignKeys)
        },
        format: async ctx => {
            const maincheck = type === 'object' ? isObject(ctx.value) : Array.isArray(ctx.value)
            return maincheck ? await formatAndValidateRecursive(ctx, objOrArr, ctx.value, ctx.fieldAddr, false, true, true, config?.deleteForeignKeys) : ctx.value
        },
        objectCache: objOrArr,
        isParent: true,
        mongoType: () => mongoTypeRecursive(objOrArr),
        tsTypeStr: (_, depth = 0) => tsTypeRecursive('tsTypeStr', objOrArr, depth),
        tsTypeStrForWrite: (_, depth = 0) => tsTypeRecursive('tsTypeStrForWrite', objOrArr, depth),
        swaggerType: depth => swaggerTypeRecursive(objOrArr, depth),
        exempleValue: depth => exempleValueRecursive(objOrArr, depth),
    } satisfies GoodCopDefinitionPartial
}

async function formatAndValidateRecursive(
    ctx: GoodCopDefCtx,
    obj: DefinitionObjChild,
    value: any,
    addr: string,
    disableFormatting,
    disableValidation,
    disableValidationBeforeFormatting,
    deleteForeignKeys = false,
) {

    ctx = { ...ctx, depth: ctx.depth + 1 } // we don't corrupt reference here

    return await triggerOnObjectTypeAsync('formatAndValidateRecursive', obj, {
        errorExtraInfos: { modelName: ctx.modelName, addressInParent: addr, deleteForeignKeys },
        //==============
        async onArray([def]) {
            const output = [] as any[]
            if (typeof value !== 'undefined' && value !== null) {
                await validateDefinitionPartials([arrDefPartials], ctx, value, addr)
                for (const [i2, arrItem] of Object.entries(value)) {
                    const result = await formatAndValidateRecursive(ctx, def, arrItem, ctx.fieldAddr + `[${i2}]`, disableFormatting, disableValidation, disableValidationBeforeFormatting, deleteForeignKeys)
                    if (!disableFormatting && typeof result !== 'undefined') output.push(result)
                }
                return output
            }
        },
        async onObject(obj) {
            const valueIsUndefined = typeof value === 'undefined'
            if (valueIsUndefined) value = {}
            else await validateDefinitionPartials([objDefPartials], ctx, value, addr)

            const output = {} as Record<string, any>
            const firstKey = Object.keys(obj)[0]
            const isDynamicKey = firstKey?.startsWith('__')

            if (isDynamicKey) {
                // match all fields
                const validator = obj[firstKey]

                for (const [k, v] of Object.entries(value)) {
                    const fieldAddr = ctx.fieldAddr ? ctx.fieldAddr + `.${k}` : k
                    const formatted = await formatAndValidateRecursive(ctx, validator, v, fieldAddr, disableFormatting, disableValidation, disableValidationBeforeFormatting, deleteForeignKeys)
                    if (!disableFormatting && typeof formatted !== 'undefined') output[k] = formatted
                }
            } else {
                for (const [k, validator] of Object.entries(obj)) {
                    const fieldAddr = ctx.fieldAddr ? ctx.fieldAddr + `.${k}` : k
                    const formatted = await formatAndValidateRecursive(ctx, validator, value[k], fieldAddr, disableFormatting, disableValidation, disableValidationBeforeFormatting, deleteForeignKeys)
                    if (!disableFormatting && typeof formatted !== 'undefined') output[k] = formatted
                }

                for (const k in value) {
                    // FOREIGN FIELDS HANDLER
                    if (typeof output[k] === 'undefined' && typeof value[k] !== 'undefined') {
                        if (!disableFormatting && !deleteForeignKeys) output[k] = value[k]
                    }
                }
            }

            return valueIsUndefined && Object.keys(output).length === 0 ? undefined : output
        },
        async onDefinition(definition) {
            const { method, dbName, dbId, fields, modelName, user, errorExtraInfos, depth } = ctx
            // TODO CHECK validateDefinitionPartials to avoid spreading the object each time
            return await definition.formatAndValidate(value, { method, addressInParent: addr, dbName, dbId, parentObj: fields, errorExtraInfos, modelName, user, disableFormatting, disableValidation, disableValidationBeforeFormatting, depth })
        },
    }, ctx.depth)
}

//----------------------------------------
// MONGOTYPE
//----------------------------------------
function mongoTypeRecursive(obj: DefinitionObjChild, depth = 0) {
    return triggerOnObjectType('mongoTypeRecursive', obj, {
        errorExtraInfos: { msg: 'mongoTypeNotDefinedForModel' },
        onDefinition: definition => definition._getMongoType(),
    }, depth)
}

//----------------------------------------
// TS TYPE STRING
//----------------------------------------
const indentationUnit = '    '

function tsTypeRecursive(fnName: 'tsTypeStr' | 'tsTypeStrForWrite', definitionChild: DefinitionObjChild, depth: number) {
    return triggerOnObjectType('tsTypeRecursive', definitionChild, {
        errorExtraInfos: { msg: 'typescriptTypeNotDefinedForModel' }, // TODO add extra infos on field name
        returnValueIfUndefined: 'any',
        onArray(arr): string {
            return `Array<${arr.map(item => tsTypeRecursive(fnName, item, depth)).join(', ')}>`
        },
        onObject(object: Record<string, Definition>): string {
            let newObjStr = ``
            for (const [k, v] of Object.entries(object)) {
                const isDynamicKey = k.startsWith('__')
                let newKey = isDynamicKey ? k.replace(/__([^.]+)/g, '[$1: string]') : k // map dynamic props firebase syntax '__userIds' to dynamic prop ts '[userIds: string]'

                if (!isDynamicKey) {
                    // OPTIONAL OR REQUIRED BEHAVIOR
                    if (v && typeof v === 'object' && '_definitions' in v) { // TODO fix find why instanceof Definition doesn't work in certain cases
                        const alwaysDefinedInRead = v._definitions.some(d => (typeof d === 'function' ? d() : d).alwaysDefinedInRead)
                        const required = (alwaysDefinedInRead && fnName === 'tsTypeStr') || v.isRequired === true
                        if (!required) newKey = k + `?` // optional by default
                    } else if ((Array.isArray(v) || isObject(v))) {
                        newKey = k + `?` // default optional if arr or obj
                    }
                }
                const tsValStr = tsTypeRecursive(fnName, v, depth + 1)

                const optional = newKey.endsWith('?')
                const parsedKey = newKey.replace(/\?$/, '')
                newObjStr += `${indentationUnit}${parsedKey.includes('[') ? parsedKey : `'${parsedKey}'`}${optional ? '?' : ''}: ${tsValStr.replace(/\n/g, `\n${indentationUnit}`)}\n`
            }
            return newObjStr.length ? `{\n${newObjStr}}` : '{}'
        },
        onDefinition: (definition): string => {
            const { read, write } = definition.getTsTypeAsString(depth)
            return fnName === 'tsTypeStr' ? read : write
        },
    }, depth)
}



//----------------------------------------
// SWAGGER TYPE
//----------------------------------------
function swaggerTypeRecursive(definitionChild: DefinitionObjChild, depth = 0) {
    return triggerOnObjectType('swaggerTypeRecursive', definitionChild, {
        errorExtraInfos: { msg: 'swaggerTypeNotDefinedForModel' },
        onArray(arr: Definition[]) {
            return { type: 'array', items: arr[0]?.getSwaggerType?.(depth) || {} } satisfies SwaggerSchema
        },
        onObject(object: Record<string, Definition>) {
            const newObjStr = { type: 'object', properties: {} } satisfies SwaggerSchema
            for (const [k, v] of Object.entries(object)) {
                if ('getSwaggerType' in v) newObjStr.properties[k] = v?.getSwaggerType?.(depth + 1)
            }
            return newObjStr
        },
        onDefinition: definition => {
            return definition?.getSwaggerType?.(depth)
        },
    }, depth)
}


//----------------------------------------
// EXAMPLE VALUE RECURSIVE
//----------------------------------------
function exempleValueRecursive(definitionChild: DefinitionObjChild, depth = 0) {
    return triggerOnObjectType('exempleValueRecursive', definitionChild, {
        errorExtraInfos: { msg: 'valueExampleNotDefinedForModel' },
        onArray(arr: Definition[]) {
            return `[${forI(2, () => arr[0]?.getExampleValue?.(depth)).join(', ')}]`
        },
        onObject(object: Record<string, Definition>) {
            const newObj = {}
            for (const [k, v] of Object.entries(object)) {
                if ('getExampleValue' in v) newObj[k] = v?.getExampleValue?.(depth + 1)
            }
            return JSON.stringify(newObj, null, 2)
        },
        onDefinition: definition => {
            return definition?.getExampleValue?.(depth)
        },
    }, depth)
}