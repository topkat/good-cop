


import { _ } from '../../src/DefinitionClass.js'


//ATT: no difference in tests between this and Lte
describe(`Max`, () => {

    const maxDef = _.number().max(2)

    it('checks the return types of read or write as a string', () => {
        expect(maxDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a number lower', async () => {
        expect(await maxDef.formatAndValidate(1)).toEqual(1)
    })

    it('throws an error if a higher number is passed', () => {
        expect(maxDef.formatAndValidate(3)).rejects.toThrow(`Value 3 exceeds the maximum allowed value of 2`)
    })
})