


import { _ } from '../../src/DefinitionClass.js'



describe('Max-Length', () => {

    const maxStringDef = _.string().maxLength(3);

    it('checks the return types of read or write as a string', () => {
        expect(maxStringDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('accepts the max length value', async () => {
        expect(await maxStringDef.formatAndValidate('hey')).toEqual('hey')
    })

    it('accepts a value below the max length value', async () => {
        expect(await maxStringDef.formatAndValidate('hi')).toEqual('hi')
    })

    it('throws an error if value exceeds max length', async () => {
        await expect(maxStringDef.formatAndValidate('hello')).rejects.toThrow(
            `Wrong length for value at 'hello'. Expected maxLength (3) but got length (5)`)
    })
})
