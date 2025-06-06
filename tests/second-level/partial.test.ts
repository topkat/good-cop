

import { _ } from '../../src/DefinitionClass.js'



describe(`Partial`, () => {

    const partial = _.object({ name: _.string() }).mergeWith({ email: _.string().required() }).partial()

    it('partialDef', () => {
        expect(partial.getTsTypeAsString().read).toContain('Partial<')
    })

    it('accepts an emptry entry as a partial object', async () => {
        expect(await partial.formatAndValidate({})).toEqual({})
    })

    it('accepts one entry as a partial object', async () => {
        expect(await partial.formatAndValidate({ name: 'testman' })).toEqual({ name: 'testman' })
    })
})