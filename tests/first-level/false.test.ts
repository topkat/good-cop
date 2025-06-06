


import { _ } from '../../src/DefinitionClass.js'



describe(`False boolean`, () => {

    const falseBooleanDef = _.false()

    it('checks the return types of read or write as a string', () => {
        expect(falseBooleanDef.getTsTypeAsString()).toEqual({ 'read': 'false', 'write': 'false' })
    })

    it('correctly formats and validates false booleans', async () => {
        expect(await falseBooleanDef.formatAndValidate(false)).toEqual(false)
    })

    it('throws an error for false boolean', async () => {
        await expect(falseBooleanDef.formatAndValidate(true)).rejects.toThrow(`Expected type false but got type boolean for value true`);
    })

    it('throws an error if the type is not a boolean', async () => {
        await expect(falseBooleanDef.formatAndValidate('testman')).rejects.toThrow(`Expected type false but got type string for value "testman"`);
    })
})