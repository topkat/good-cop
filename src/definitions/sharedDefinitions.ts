import { defaultTypeError } from '../helpers/definitionGenericHelpers.js'
import { DefinitionPartial } from '../definitionTypes.js'

import { isset } from 'topkat-utils'


export const sharedDefinitions = {
    string: ({ acceptEmpty = false, hardCodedValue = undefined as string | undefined } = {}) => ({
        mainType: 'string',
        errorMsg: ctx => ctx.value === '' && acceptEmpty === false ? 'Empty string not allowed' : defaultTypeError(hardCodedValue || 'string')(ctx),
        format: ctx => hardCodedValue ? hardCodedValue : (typeof ctx.value === 'number' ? ctx.value.toString() : typeof ctx.value === 'string' ? ctx.value?.trim() : ctx.value),
        validate: ctx => hardCodedValue ? ctx.value === hardCodedValue : typeof ctx.value === 'string' && (acceptEmpty || ctx.value.length),
        mongoType: 'string',
        tsTypeStr: hardCodedValue ? `'${hardCodedValue}'` : 'string',
        swaggerType: { type: 'string' },
        exempleValue: '"rndmString"', //() => generateToken(random(10, 30), false, 'alphanumeric'),
    }),
    boolean: {
        name: 'boolean',
        mainType: 'boolean',
        errorMsg: defaultTypeError('boolean'),
        // format: ctx => !!ctx.value, commented because we want "strict mode"
        validate: ctx => typeof ctx.value === 'boolean',
        mongoType: 'boolean',
        tsTypeStr: 'boolean',
        swaggerType: { type: 'boolean' },
        exempleValue: 'true', // () => randomItemInArray([true, false]),
    },
    required: {
        name: 'required',
        priority: 5, // should be run after default
        errorMsg: ctx => `Field ${ctx.fieldAddr} is required`,
        validate: ctx => isset(ctx.value),
        required: true,
        methods: 'create',
        triggerOnUndefineds: true,
    },
    number: {
        mainType: 'number',
        errorMsg: defaultTypeError('number'),
        validate: ctx => typeof ctx.value === 'number' && !isNaN(ctx.value),
        mongoType: 'number',
        tsTypeStr: 'number',
        format: ctx => {
            const parsedVal = parseFloat(ctx.value)
            return isNaN(parsedVal) ? ctx.value : parsedVal
        },
        swaggerType: { type: 'number', format: 'float' },
        exempleValue: '12', //() => round2(Math.random() * 10, 3),
    },
    round2: {
        errorMsg: defaultTypeError('number'),
        validate: ctx => typeof ctx.value === 'number' && !isNaN(ctx.value),
        mongoType: 'number',
        tsTypeStr: 'number',
        format: ctx => {
            const parsedVal = Math.round(ctx.value * 100) / 100
            return isNaN(parsedVal) ? ctx.value : parsedVal
        },
        swaggerType: { type: 'number', format: 'float' },
        exempleValue: '12.12', //() => round2(Math.random() * 10),
    },
    lt: (maxVal: number) => ({
        errorMsg: ctx => `Value ${ctx.value} should be strictly below required maximum value ${maxVal}`,
        validate: ctx => ctx.value < maxVal,
    }),
    gt: (minVal: number) => ({
        errorMsg: ctx => `Value ${ctx.value} should be strictly above ${minVal}`,
        validate: ctx => ctx.value > minVal,
    }),
    lte: (maxVal: number) => ({
        errorMsg: ctx => `Value ${ctx.value} exceeds the maximum allowed value of ${maxVal}`,
        validate: ctx => ctx.value <= maxVal,
    }),
    gte: (minVal: number) => ({
        errorMsg: ctx => `Value ${ctx.value} is below the allowed threshold of ${minVal}`,
        validate: ctx => ctx.value >= minVal,
    }),
    undefType: {
        mainType: 'undefined',
        validate: () => true,
        format: ctx => typeof ctx.value === 'undefined' ? ctx.value : undefined,
        tsTypeStr: `undefined`,
        swaggerType: { type: {} },
        exempleValue: 'undefined', // () => round2(Math.random() * 10),
    },
    wrapperTypeStr: (def, wrapperName) => ({
        tsTypeStr: () => {
            const typeStr = def.getTsTypeAsString().read
            return typeStr.startsWith(wrapperName) ? typeStr : `${wrapperName}<${typeStr}>`
        },
        tsTypeStrForWrite: () => {
            const typeStr = def.getTsTypeAsString().write
            return typeStr.startsWith(wrapperName) ? typeStr : `${wrapperName}<${typeStr}>`
        },
    }),
} satisfies Record<string, DefinitionPartial | (() => DefinitionPartial)>