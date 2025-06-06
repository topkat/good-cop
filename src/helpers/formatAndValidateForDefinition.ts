
import { User } from '../core-types.js'
import { GoodCopDefinitionPartial, GoodCopDefCtxWithoutValueAndAddr, GoodCopDefCtx, GoodCopDaoGenericMethods } from '../definitionTypes.js'
import { DefinitionBase } from '../DefinitionBaseClass.js'

import { DescriptiveError } from 'topkat-utils'

export async function formatAndValidate<This extends DefinitionBase>(
    this: This,
    value: any,
    options: {
        method?: GoodCopDaoGenericMethods
        /** addr is specfied if value is a child of an object */
        addressInParent?: string
        parentObj?: Record<string, any>
        dbId?: string
        dbName?: string
        modelName?: string
        errorExtraInfos?: Record<string, any>
        disableValidation?: boolean
        /** may provide a little perf boost for validation on read operation (that where already formatted on write) */
        disableFormatting?: boolean
        disableValidationBeforeFormatting?: boolean
        user?: User
        /** Tracking depth in recursive validation functions */
        depth?: number
    } = {}
) {
    const definitions = this._definitions.map(d => typeof d === 'function' ? d() : d)
    const {
        dbId,
        dbName,
        method,
        parentObj,
        modelName,
        addressInParent = '',
        errorExtraInfos = {},
        disableValidation,
        disableFormatting,
        disableValidationBeforeFormatting,
        user,
        depth = 0,
    } = options

    errorExtraInfos.userId = user?._id
    errorExtraInfos.userRole = user?.role

    const defCtx = { dbName, modelName, dbId, method, fields: parentObj || value, user, depth } as GoodCopDefCtxWithoutValueAndAddr

    defCtx.errorExtraInfos = errorExtraInfos

    definitions.forEach(def => def.errorExtraInfos && Object.assign(errorExtraInfos, def.errorExtraInfos))

    return await formatAndValidateDefinitionPartials(definitions, defCtx, disableValidation, disableFormatting, disableValidationBeforeFormatting, value, addressInParent)
}

export async function formatAndValidateDefinitionPartials(
    definitions: GoodCopDefinitionPartial[],
    defCtxRaw: GoodCopDefCtxWithoutValueAndAddr,
    disableValidation = false,
    disableFormatting = false,
    disableValidationBeforeFormatting = false,
    value: any,
    fieldAddr: string
) {

    const { method = 'create' } = defCtxRaw
    const defCtx = { ...defCtxRaw, value, fieldAddr } as GoodCopDefCtx

    if (typeof defCtxRaw.errorExtraInfos === 'undefined') defCtxRaw.errorExtraInfos = {}

    for (const def of definitions) {

        const { errorMsg, methods = ['create', 'update'], triggerOnUndefineds } = def

        const validationErr = async () => {
            const errMsg = typeof errorMsg === 'string' ? errorMsg : typeof errorMsg === 'function' ? await errorMsg(defCtx) : 'fieldValidationError'
            const { dbName, modelName, dbId, method, fields } = defCtx
            throw new DescriptiveError(errMsg, { code: 422, ...defCtx.errorExtraInfos, dbName, modelName, dbId, method, value, fieldAddr, fields }) // TODO for unit tests we should put models.mongo[dbName][modelName] to fix
        }

        defCtx.definition = def
        if (def.name) defCtx.errorExtraInfos.definition = def.name

        if (def.acceptNull && defCtx.value === null) return defCtx.value

        if ((value !== undefined || triggerOnUndefineds) && methods.includes(method)) {
            // VALIDATE before formatting
            if (
                disableValidationBeforeFormatting !== true
                && def.validateBeforeFormatting
                && !await def.validateBeforeFormatting(defCtx)
            ) await validationErr()
            // FORMAT
            if (
                disableFormatting !== true
                && def.format
            ) {
                const formattedValue = await def.format(defCtx)
                defCtx.value = formattedValue
            }
            // VALIDATE
            if (
                disableValidation !== true
                && def.validate
                && !await def.validate(defCtx)
            ) await validationErr()
        }
    }

    return defCtx.value
}



/* alias */
export async function validateDefinitionPartials(
    definitions: GoodCopDefinitionPartial[],
    defCtx: GoodCopDefCtxWithoutValueAndAddr, // for perf
    value: any,
    fieldAddr: string
) {
    return await formatAndValidateDefinitionPartials(definitions, defCtx, false, true, false, value, fieldAddr)
}