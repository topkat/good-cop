


import { _ } from '../../src/DefinitionClass.js'


//ATT: no difference in tests between this and Lt
describe(`Lt`, () => {

    const ltDef = _.number().lessThan(2)

    it('checks the return types of read or write as a string', () => {
        expect(ltDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a number lower', async () => {
        expect(await ltDef.formatAndValidate(1)).toEqual(1)
    })

    it('throws an error if a higher number is passed', () => {
        expect(ltDef.formatAndValidate(3)).rejects.toThrow(`Value 3 should be strictly below required maximum value 2`)
    })
})