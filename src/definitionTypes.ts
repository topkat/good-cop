

import { User, NoExtraProperties, MaybePromise, ObjectWithNoFn } from './core-types.js'
import type { Definition } from './DefinitionClass.js'

/** Type that matches all possible definitions */
export type DefinitionOut = Required<Pick<Definition, GoodCopUniversalMethods>> & Partial<Omit<Definition, GoodCopUniversalMethods>>

export type TypedExclude<T extends keyof Definition, K extends keyof Definition> = Exclude<T, K>

export type EnsureIsDefMethod<T extends keyof Definition> = T

export type FirstLevelTypes = EnsureIsDefMethod<
    'any' | 'array' |
    'boolean' |
    'date' | 'date12' | 'date8' |
    'email' | 'enum' |
    'false' | 'float' |
    'genericObject' |
    'integer' |
    'model' | 'mongoModel' |
    'n' | 'name' | 'null' | 'number' |
    'object' | 'objectId' |
    'password' | 'percentage' |
    'ref' | 'regexp' |
    'string' | 'stringConstant' |
    'translation' | 'true' | 'tuple' | 'typesOr' |
    'undefined' |
    'url' |
    'void' |
    'year'
>

export type GoodCopUniversalMethods = EnsureIsDefMethod<
    'alwaysDefinedInRead' |
    '_definitions' | '_getDefinitionObjFlat' | '_getObjectCache' | '_getMongoType' | '_pushNewDef' | '_refValue' |
    'default' |
    'errorExtraInfos' |
    'formatAndValidate' |
    'getDefinitionValue' | 'getMainType' | 'getName' | 'getTsTypeAsString' | 'getSwaggerType' | 'getExampleValue' |
    'isRequired' | 'isRequiredType' | 'isType' |
    'onFormat' | 'onValidate' | 'optional' |
    'promise' |
    'required' |
    'ts' |
    'tsTypeRead' | 'tsTypeWrite' | 'tsType' |
    'unique'
>


export type GoodCopLengthMethods = EnsureIsDefMethod<'length' | 'maxLength' | 'minLength'>

export type GoodCopNumberMethods = EnsureIsDefMethod<'between' | 'greaterThan' | 'gt' | 'gte' | 'lt' | 'lte' | 'max' | 'min' | 'lessThan' | 'round2' | 'positive'>

export type GoodCopStringMethods = 'lowerCase' | 'upperCase' | 'trim' | 'match' | GoodCopLengthMethods


export type GoodCopDateMethods = 'isFuture'


export type GoodCopSecondLevelMethods = Exclude<keyof Definition, FirstLevelTypes | GoodCopUniversalMethods>

export type GoodCopNextDefinition<
    Def extends Definition<any, any, any, any>,
    Keys extends GoodCopSecondLevelMethods = never
> = Pick<Def, Keys | GoodCopUniversalMethods>



// export type DefinitionOut = Partial<Omit<Definition, UniversalMethods>> & Required<Pick<Definition, UniversalMethods>>

import { ErrorOptions } from 'topkat-utils'

export type GoodCopDaoGenericMethods = 'create' | 'update' | 'delete' | 'getOne' | 'getAll' // duplicated in core types

export type GoodCopMongoTypesString = 'date' | 'number' | 'boolean' | 'object' | 'string' | 'mixed' | 'objectId'

export type GoodCopMainTypes = Exclude<GoodCopMongoTypesString, 'objectId' | 'mixed'> | 'array' | 'any' | 'undefined'

export type GoodCopDefinitionPartialFn = () => GoodCopDefinitionPartial & { priority: number } // usually possible in real js

export type GoodCopDefinitionPartial = NoExtraProperties<{
    /** A string representation of the type BUT NOT TYPESCRIPT */
    mainType?: GoodCopMainTypes
    /** Name of the definition for used for debugging purpose */
    name?: string
    /** The lower, the more precedence it will take */
    priority?: number
    /** Documentation, not used actually */
    doc?: string
    /** Error message displayed when the validate function return falsey value */
    errorMsg?: string | ((ctx: GoodCopDefCtx) => MaybePromise<string>)
    /** Shall represent the ts type, the value should never be evaluated in code, only the inferred type, so we can type as `{ tsType: '' as any as anyTypeYouWant }` */
    tsType?: ((previousType: string, depth?: number) => string) | any
    /** string representation of the typescript type */
    tsTypeStr?: ((previousType: string, depth?: number) => string) | string
    /** string representation of the typescript type for write methods (update, create) */
    tsTypeStrForWrite?: ((previousType: string, depth?: number) => string) | string
    /** Use function to modify mongoType object directly, use object to pass a full or a string to define which type to use for mongo for that field */
    mongoType?: ((mongoTypeObj: Record<string, any>, definitions: (GoodCopDefinitionPartial | GoodCopDefinitionPartialFn)[]) => any) | GoodCopMongoTypesString | Record<string, any>
    /** string representation of the Swagger type */
    swaggerType?: SwaggerSchema | ((depth?: number) => SwaggerSchema)
    /** string representation of an example value */
    exempleValue?: string | ((depth?: number) => string)
    /** should return a truthy value if valid and falsey if not. Actually validation is done AFTER formatting. If you want it differently please use validateBeforeFormatting() */
    validate?: (ctx: GoodCopDefCtx) => (any | Promise<any>)
    /** This happen BEFORE formatting, unless classic validation should return a truthy value if valid and falsey if not */
    validateBeforeFormatting?: (ctx: GoodCopDefCtx) => (any | Promise<any>)
    format?: (ctx: GoodCopDefCtx) => (any | Promise<any>)
    /** field is always defined when reading, for example if it has a default value */
    alwaysDefinedInRead?: true
    /** shall the function be triggered on undefined fields */
    triggerOnUndefineds?: boolean
    /** triggered only when method is the one selected */
    methods?: GoodCopDaoGenericMethods | GoodCopDaoGenericMethods[]
    required?: boolean
    ref?: string
    // isArray?: boolean
    dbName?: string
    model?: string
    errorExtraInfos?: ErrorOptions
    /** define param name when for example in an array (paramsValidator...) */
    paramName?: string
    /** */
    objectCache?: DefinitionObjChild
    /** does the field is an array or object that contains other definitions */
    isParent?: boolean
    /** used to determine the number of nested generic objects, when generic type is used */
    nbNestedGenericObjects?: 1 | 2 | 3
    /** Determine that null is a valid value for the field */
    acceptNull?: boolean
}>


export interface GoodCopDefCtx {
    modelName: string
    addressInParent: string
    errorExtraInfos: ObjectWithNoFn
    definition: GoodCopDefinitionPartial
    dbId?: string
    dbName?: string
    method: GoodCopDaoGenericMethods
    value: any
    fields: ObjectWithNoFn
    fieldAddr: string
    map?: ObjectWithNoFn
    user: User
    /** Track depth in recursive functions */
    depth: number
}

export type GoodCopDefCtxWithoutValueAndAddr = Omit<GoodCopDefCtx, 'value' | 'fieldAddr'>

export type InferType<T extends DefinitionObjChild> = InferTypeRead<T> // alias

//-----------------------------------------------------------------------
//   /!\ ABOUT CODE DUPLICATION, this makes the code way more readable
// *  in suggestions type is displayed as { myProp: string }
// *  else it is printed as InferSubType<Definition<Modelssss, any,
// *   any>, { name: Definition<Modelssss, "aa", string, string>; }>
// *  which is not readable at all
//-----------------------------------------------------------------------
/** Infer type for definition or object / array of definitions and all read methods (some requirement may vary between read/write types) */
export type InferTypeRead<
    T extends DefinitionObjChild
> =
    T extends GenericDef
    ? T['tsTypeRead']
    : {
        [K in keyof T as T[K] extends GenericDef ? T[K]['isRequiredType'] extends true ? K : never : K]:
        T[K] extends GenericDef
        ? T[K]['tsTypeRead'] // definition
        : T[K] extends any[]
        ? GoodCopInferTypeArrRead<T[K]> // array
        : T[K] extends Record<any, any>
        ? InferTypeRead<T[K]> : // object
        never // unknown
    } & {
        [K in keyof T as T[K] extends GenericDef ? T[K]['isRequiredType'] extends true ? never : K : never]?:
        T[K] extends GenericDef
        ? T[K]['tsTypeRead'] // definition
        : T[K] extends any[]
        ? GoodCopInferTypeArrRead<T[K]> // array
        : T[K] extends Record<any, any>
        ? InferTypeRead<T[K]> : // object
        never // unknown
    }


export type GenericDef = {
    tsType: any,
    tsTypeRead: any,
    tsTypeWrite: any
    isRequiredType: boolean
    getTsTypeAsString: () => ({ read: string, write: string })
    getSwaggerType: (depth?: number) => SwaggerSchema
    getExampleValue: (depth?: number) => any
    _definitions: GoodCopDefinitionPartial[]
}

export type GenericDefinition = GenericDef

export type GoodCopInferTypeArrRead<T extends readonly DefinitionObjChild[]> =
    T extends [] ? [] :
    T[number] extends (infer U) ?
    U extends GenericDef ? U['tsTypeRead'][] : // 1st item is definition
    U extends Record<any, any> ? InferTypeRead<U>[] : // 1st item is Model
    never : // 1st item is unknown
    never // not an array


/** Infer type for definition or object / array of definitions and all write methods (some requirement may vary between read/write types) */
export type InferTypeWrite<
    T extends DefinitionObjChild
> =
    T extends GenericDef
    ? T['tsTypeWrite']
    : {
        [K in keyof T as T[K] extends GenericDef ? T[K]['isRequiredType'] extends true ? K : never : K]:
        T[K] extends GenericDef
        ? T[K]['tsTypeWrite'] // definition
        : T[K] extends any[]
        ? GoodCopInferTypeArrWrite<T[K]> // array
        : T[K] extends Record<any, any>
        ? InferTypeWrite<T[K]> : // object
        never // unknown
    } & {
        [K in keyof T as T[K] extends GenericDef ? T[K]['isRequiredType'] extends true ? never : K : never]?:
        T[K] extends GenericDef
        ? T[K]['tsTypeWrite'] // definition
        : T[K] extends any[]
        ? GoodCopInferTypeArrWrite<T[K]> // array
        : T[K] extends Record<any, any>
        ? InferTypeWrite<T[K]> : // object
        never // unknown
    }

export type GoodCopInferTypeArrWrite<T extends readonly DefinitionObjChild[]> =
    T extends [] ? [] :
    T[number] extends (infer U) ?
    U extends GenericDef ? U['tsTypeWrite'][] : // 1st item is definition
    U extends Record<any, any> ? InferTypeWrite<U>[] : // 1st item is Model
    never : // 1st item is unknown
    never // not an array

export type DefinitionObjChild = GenericDef | DefinitionObj | GenericDef[] | DefinitionObj[]

export type DefinitionObj = { [field: string]: DefinitionObjChild }

export type GoodCopAutoWritedFieldNames = 'lastUpdateDate' | 'creationDate' | 'lastUpdater' | 'creator'

export type CoodCopDefinitionClassReceivedModelType = {
    [databaseName: string]: {
        [modelName: string]: GoodCopModelReadWrite
    }
}

export type GoodCopModelReadWrite = { // duplicated in core, but may aboid lot of dependencies imported at build
    Write: Record<string, any>
    Read: Record<string, any>
    // WithoutGenerics?: Record<string, any>
    // WithoutGenericsWrite?: Record<string, any>
}

export type GoodCopProvidedModels = {
    [databaseName: string]: {
        [modelName: string]: GenericDef
    }
}





export type SwaggerSchema =
    { type: Record<string, any>, example?: undefined } // any
    | { oneOf: SwaggerSchema[], example?: any }
    | { type: 'string'; format?: 'byte' | 'binary' | 'date' | 'date-time' | 'password' | 'email' | 'uuid' | 'url'; example?: string, enum?: string[] }
    | { type: 'number'; format?: 'float' | 'double'; example?: number }
    | { type: 'integer'; format?: 'int32' | 'int64'; example?: number }
    | { type: 'boolean'; example?: boolean }
    | { type: 'array'; items: SwaggerSchema | {}; example?: any[] }
    | {
        type: 'object';
        properties?: Record<string, SwaggerSchema>;
        required?: string[];
        example?: Record<string, any>;
    }
// | { type: string; enum: string[]; example?: string }





// /!\ This type can't be exported from topkat-utils because of that 💩 since ESM migration:
// backend/dataTracking/dataTrackingRegisterEvent.svc.ts(30,14): error TS2742: The inferred type of 'dataTrackingRegisterEvent' cannot be named without a reference to 'green_dot/node_modules/topkat-utils'. This is likely not portable. A type annotation is necessary.
export type GoodCopErrorOptions = Partial<{ code: number, doNotThrow: boolean, err: any, notifyAdmins: boolean, doNotDisplayCode: boolean, doNotWaitOneFrameForLog: boolean, noStackTrace: boolean }> & Record<string, any>