


import { _ } from '../../src/DefinitionClass.js'


//ATT: no difference in tests between this and Min
describe(`Gte`, () => {

    const gteDef = _.number().min(2)

    it('checks the return types of read or write as a string', () => {
        expect(gteDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a number equal', async () => {
        expect(await gteDef.formatAndValidate(2)).toEqual(2)
    })

    it('accepts a number higher', async () => {
        expect(await gteDef.formatAndValidate(3)).toEqual(3)
    })

    it('throws an error if a lower number is passed', () => {
        expect(gteDef.formatAndValidate(1)).rejects.toThrow(`Value 1 is below the allowed threshold of 2`)
    })
})