


import { _ } from '../../src/DefinitionClass.js'



describe(`Boolean`, () => {

    const booleanDef = _.boolean()

    it('checks the return types of read or write as a string', () => {
        expect(booleanDef.getTsTypeAsString()).toEqual({ 'read': 'boolean', 'write': 'boolean' })
    })

    it('correctly formats and validates true booleans', async () => {
        expect(await booleanDef.formatAndValidate(true)).toEqual(true)
    })

    it('correctly formats and validates false booleans', async () => {
        expect(await booleanDef.formatAndValidate(false)).toEqual(false)
    })

    it('throws an error if the type is not a boolean', async () => {
        await expect(booleanDef.formatAndValidate('testman')).rejects.toThrow(`Expected type boolean but got type string for value "testman"`)
    })
})