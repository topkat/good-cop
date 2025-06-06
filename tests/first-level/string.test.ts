


import { _ } from '../../src/DefinitionClass.js'



describe(`String`, () => {

    const stringDef = _.string({ acceptEmpty: true })

    it('checks the return types of read or write as a string', () => {
        expect(stringDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('correctly formats and validates strings', async () => {
        expect(await stringDef.formatAndValidate('rere')).toEqual('rere')
    })

    it('converts a number to a string', async () => {
        expect(await stringDef.formatAndValidate(1)).toEqual('1')
    })

    it('accepts an empty string', async () => {
        expect(await stringDef.formatAndValidate('')).toEqual('')
    })

    it('handles a string with special characters', async () => {
        const result = await stringDef.formatAndValidate('hello!@#$')
        expect(result).toEqual('hello!@#$')
    })

    it('trims leading and trailing spaces from the string', async () => {
        const result = await stringDef.formatAndValidate('  hello world  ')
        expect(result).toEqual('hello world')
    })

    it('throws an error if passed a boolean', async () => {
        await expect(stringDef.formatAndValidate(true)).rejects.toThrow('Expected type string but got type boolean for value')
    })

    it('throws an error when passed an object', async () => {
        await expect(stringDef.formatAndValidate({ id: 1 })).rejects.toThrow('Expected type string but got type object for value')
    })

    it('throws an error when passed an array', async () => {
        await expect(stringDef.formatAndValidate([])).rejects.toThrow('Expected type string but got type array of undefined for value []')
    })
})