


import { _ } from '../../src/DefinitionClass.js'



describe(`True boolean`, () => {

    const trueBooleanDef = _.true()

    it('checks the return types of read or write as a string', () => {
        expect(trueBooleanDef.getTsTypeAsString()).toEqual({ 'read': 'true', 'write': 'true' })
    })

    it('correctly formats and validates true booleans', async () => {
        expect(await trueBooleanDef.formatAndValidate(true)).toEqual(true)
    })

    it('throws an error for false boolean', async () => {
        await expect(trueBooleanDef.formatAndValidate(false)).rejects.toThrow(`Expected type true but got type boolean for value false`);
    })

    it('throws an error if the type is not a boolean', async () => {
        await expect(trueBooleanDef.formatAndValidate('testman')).rejects.toThrow(`Expected type true but got type string for value "testman"`);
    })
})