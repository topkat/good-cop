


import { _ } from '../../src/DefinitionClass.js'



describe(`Trim`, () => {

    const trimDef = _.string().trim()

    it('checks the return types of read or write as a string', () => {
        expect(trimDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('correctly formats and validates strings', async () => {
        expect(await trimDef.formatAndValidate('string')).toEqual('string')
    })

    it('trims leading and trailing spaces', async () => {
        expect(await trimDef.formatAndValidate('   string   ')).toEqual('string')
    })
})