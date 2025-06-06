


import { _ } from '../../src/DefinitionClass.js'



describe(`Null`, () => {

    const nullDef = _.null()

    it('checks the return types of read or write as a string', () => {
        expect(nullDef.getTsTypeAsString()).toEqual({ 'read': 'null', 'write': 'null' })
    })

    it('accepts an null value', async () => {
        expect(await nullDef.formatAndValidate(null)).toEqual(null)
    })

    it('accepts an undefined value', async () => {
        expect(await nullDef.formatAndValidate(undefined)).toEqual(undefined)
    })

    it('converts a value to null', async () => {
        expect(await nullDef.formatAndValidate(2)).toEqual(null)
    })
})