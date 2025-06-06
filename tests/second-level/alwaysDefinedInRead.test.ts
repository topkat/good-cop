


import { _ } from '../../src/DefinitionClass.js'



describe(`AlwaysDefinedInRead`, () => {

    const alwaysDefinedInReadDef = _.string().alwaysDefinedInRead()

    it('checks the return types of read or write as a string', () => {
        expect(alwaysDefinedInReadDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('accepts the length value', async () => {
        expect(await alwaysDefinedInReadDef.formatAndValidate('testman')).toEqual('testman')
    })
})