


import { _ } from '../../src/DefinitionClass.js'



describe(`Uppercase`, () => {

    const upperCaseDef = _.string().upperCase()

    it('checks the return types of read or write as a string', () => {
        expect(upperCaseDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('accepts a string of uppercase characters', async () => {
        expect(await upperCaseDef.formatAndValidate('UPPERCASE')).toEqual('UPPERCASE')
    })

    it('converts a string to uppercase', async () => {
        expect(await upperCaseDef.formatAndValidate('camelCase')).toEqual('CAMELCASE')
    })
})