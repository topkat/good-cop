
import { DefCtx } from '../definitionTypes.js'

export const defaultTypeError = (type, displayCompareWithTypeofValue = true) => ({ value, errorExtraInfos }: DefCtx) => {
    errorExtraInfos.expectedType = type
    errorExtraInfos.gotType = getType(value)
    return `Expected type ${type} but got ${displayCompareWithTypeofValue ? `type ${Array.isArray(value) ? `array of ${getType(value[0])}` : getType(value)} for value ` : ''}${JSON.stringify(value)}`
}

function getType(value) {
    return typeof value === 'number' && isNaN(value) ? 'NaN' : typeof value === 'undefined' ? 'undefined' : typeof value
}