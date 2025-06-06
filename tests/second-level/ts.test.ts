


import { _ } from '../../src/DefinitionClass.js';



describe(`Ts`, () => {

    const tsDef = _.string().ts('string')

    it('checks the return types of read or write as a string', () => {
        expect(tsDef.getTsTypeAsString()).toEqual({ read: 'string', write: 'string' })
    })

    it('validates a value matching the read type', async () => {
        expect(await tsDef.formatAndValidate('hello')).toEqual('hello')
    })

    it('throws an error for unsupported types like boolean', async () => {
        await expect(tsDef.formatAndValidate(true)).rejects.toThrow(
            'Expected type string but got type boolean for value'
        )
    })

    it('handles special characters within valid strings', async () => {
        expect(await tsDef.formatAndValidate('hello!@#$%^&*()')).toEqual('hello!@#$%^&*()')
    })

    it('throws an error for null values', async () => {
        await expect(tsDef.formatAndValidate(null)).rejects.toThrow(
            'Expected type string but got type object for value null'
        )
    })

    it('trims strings correctly if relevant', async () => {
        expect(await tsDef.formatAndValidate('  hello world  ')).toEqual('hello world')
    })
})