


import { _ } from '../../src/DefinitionClass.js'



describe('Email', () => {

    const emailDef = _.email()

    it('checks the return types of read or write as a string', () => {
        expect(emailDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('should accept valid email', async () => {
        expect(await emailDef.formatAndValidate('testman@gmail.com')).toEqual('testman@gmail.com')
    })

    it('throws an error if no @ is used', async () => {
        await expect(emailDef.formatAndValidate('testman.com')).rejects.toThrow('Expected type email but got "testman.com"')
    })

    it('throws an error if no user is used', async () => {
        await expect(emailDef.formatAndValidate('@.com')).rejects.toThrow('Expected type email but got "@.com"')
    })

    it('throws an error if no domain is used', async () => {
        await expect(emailDef.formatAndValidate('testman@')).rejects.toThrow('Expected type email but got "testman@"')
    })
})