


import { _ } from '../../src/DefinitionClass.js'



describe(`Password`, () => {

    const simpleEncrypt = (value: string): string => {
        return value.split('').reverse().join('')
    }

    const passwordDef = _.password({
        regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        minLength: 8,
        maxLength: 30,
        encrypt: simpleEncrypt
    })

    it('checks the return types of read or write as a string', () => {
        expect(passwordDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('throws an error if password does not match regex', async () => {
        await expect(passwordDef.formatAndValidate('12345678@')).rejects.toThrowError(
            `Password doesn't match regexp /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$/`
        )
    })

    it('throws an error if password is less than 8 characters', async () => {
        await expect(passwordDef.formatAndValidate('<8Char')).rejects.toThrowError('Password is inferior than minLength of 8')
    })

    it('throws an error if password is greater than 30 characters', async () => {
        await expect(passwordDef.formatAndValidate('>30Char1234567891011121314151617181920')).rejects.toThrowError('Password is superior than maxLength of 30')
    })

    it('Coorect encryption', async () => {
        expect(await passwordDef.formatAndValidate('V@lidPa55')).toEqual('55aPdil@V')
    })
})


describe(`Password langeth and encrytion edge case`, () => {

    const simpleEncrypt = (value: string): string => {
        return value.split('').reverse().join('').repeat(2)
    }

    const passwordDef = _.object({
        pass: _.password({
            regexp: /^\d+$/,
            minLength: 6,
            maxLength: 6,
            encrypt: simpleEncrypt
        })
    })

    it('Password should be correctly validated', async () => {
        expect(await passwordDef.formatAndValidate({
            pass: '123456',
        })).toEqual({ 'pass': '654321654321' })
    })
})