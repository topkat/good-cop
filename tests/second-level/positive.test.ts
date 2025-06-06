


import { _ } from '../../src/DefinitionClass.js'



describe(`Positive`, () => {

    const positiveDef = _.number().positive()

    it('checks the return types of read or write as a string', () => {
        expect(positiveDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a positive number', async () => {
        expect(await positiveDef.formatAndValidate(2.356)).toEqual(2.356)
    })

    it('throws an error when passed a negative number', () => {
        expect(positiveDef.formatAndValidate(-2.354)).rejects.toThrow(`Value -2.354 should be positive`)
    })
})