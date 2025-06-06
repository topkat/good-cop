


import { _ } from '../../src/DefinitionClass.js'


//ATT: no difference in tests between this and Gte
describe(`Min`, () => {

    const minDef = _.number().min(2)

    it('checks the return types of read or write as a string', () => {
        expect(minDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a number equal', async () => {
        expect(await minDef.formatAndValidate(2)).toEqual(2)
    })

    it('accepts a number higher', async () => {
        expect(await minDef.formatAndValidate(3)).toEqual(3)
    })

    it('throws an error if a lower number is passed', () => {
        expect(minDef.formatAndValidate(1)).rejects.toThrow(`Value 1 is below the allowed threshold of 2`)
    })
})