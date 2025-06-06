


import { _ } from '../../src/DefinitionClass.js'



describe('Url', () => {

    const urlDef = _.url()

    it('urlDef', () => {
        expect(urlDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('should accept valid https url', async () => {
        expect(await urlDef.formatAndValidate('https://testman.com')).toEqual('https://testman.com')
    })

    it('should accept valid http url', async () => {
        expect(await urlDef.formatAndValidate('http://testman.com')).toEqual('http://testman.com')
    })

    it('throws an error if no protocol is used', async () => {
        await expect(urlDef.formatAndValidate('testman.com')).rejects.toThrow('Expected type url but got "testman.com"')
    })
})