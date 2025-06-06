


import { _ } from '../../src/DefinitionClass.js'



describe(`Types Or Simple`, () => {

    const typesOrDef = _.typesOr([_.number(), _.boolean()])

    it(`throws if it's not any of the allowed types`, async () => {
        await expect(typesOrDef.formatAndValidate('stringue')).rejects.toThrow(`Value "stringue" should be one of the following types: number, boolean`)
    })

    it('Allow one of the types', async () => {
        expect(await typesOrDef.formatAndValidate(5)).toEqual(5)
    })

    it('Allow the other of the types', async () => {
        await expect(await typesOrDef.formatAndValidate(true)).toEqual(true)
    })
})


describe(`Types Or Complex`, () => {

    const typesOrDef = _.typesOr([
        _.object({ a: _.enum(['a', 'b']).required() }),
        _.object({ b: _.enum(['c', 'd']).required() }),
    ])


    it('1st type OK', async () => {
        expect(await typesOrDef.formatAndValidate({ a: 'a' })).toEqual({ a: 'a' })
    })

    it('2nd type OK', async () => {
        expect(await typesOrDef.formatAndValidate({ b: 'c' })).toEqual({ b: 'c' })
    })

    it(`Mixed type wrong`, async () => {
        await expect(typesOrDef.formatAndValidate({ a: 'c' })).rejects.toThrow(`Value {"a":"c"} should be one of the following types: { 'a': 'a' | 'b'}, { 'b': 'c' | 'd'}`)
    })

    it(`Mixed type wrong 2`, async () => {
        await expect(typesOrDef.formatAndValidate({ z: 't' })).rejects.toThrow(`Value {"z":"t"} should be one of the following types: { 'a': 'a' | 'b'}, { 'b': 'c' | 'd'}`)
    })

})