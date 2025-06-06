


import { _ } from '../../src/DefinitionClass.js'



describe('Min-Length', () => {

    const minStringDef = _.string().minLength(3);

    it('checks the return types of read or write as a string', () => {
        expect(minStringDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('accepts the min length value', async () => {
        expect(await minStringDef.formatAndValidate('hey')).toEqual('hey')
    })

    it('accepts a value above the min length value', async () => {
        expect(await minStringDef.formatAndValidate('hello')).toEqual('hello')
    })

    it('throws an error if value exceeds min length', async () => {
        await expect(minStringDef.formatAndValidate('hi')).rejects.toThrow(
            `Wrong length for value at 'hi'. Expected minLength (3) but got length (2)`)
    })
})