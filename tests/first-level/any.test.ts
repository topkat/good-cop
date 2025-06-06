


import { _ } from '../../src/DefinitionClass.js'



describe(`Any`, () => {

    const anyDef = _.any()

    it('checks the return types of read or write as a string', () => {
        expect(anyDef.getTsTypeAsString()).toEqual({ 'read': 'any', 'write': 'any' })
    })

    it('accepts a string', async () => {
        expect(await anyDef.formatAndValidate('string')).toEqual('string')
    })

    it('accepts a number', async () => {
        expect(await anyDef.formatAndValidate(42)).toEqual(42)
    })

    it('accepts a boolean', async () => {
        expect(await anyDef.formatAndValidate(true)).toEqual(true)
    })

    it('accepts an array', async () => {
        expect(await anyDef.formatAndValidate([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('accepts an object', async () => {
        expect(await anyDef.formatAndValidate({ name: 'testman', age: 25 })).toEqual({ name: 'testman', age: 25 })
    })
})