


import { _ } from '../../src/DefinitionClass.js'



describe(`Between`, () => {

    const betweenDef = _.number().between(1, 3)

    it('checks the return types of read or write as a string', () => {
        expect(betweenDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a number between defined numbers', async () => {
        expect(await betweenDef.formatAndValidate(2)).toEqual(2)
    })

    it('accepts the lower of the defined numbers', async () => {
        expect(await betweenDef.formatAndValidate(1)).toEqual(1)
    })

    it('accepts the higher of the defined numbers', async () => {
        expect(await betweenDef.formatAndValidate(3)).toEqual(3)
    })

    it('throws an error if a higher number is passed', () => {
        expect(betweenDef.formatAndValidate(4)).rejects.toThrow(`Value 4 should be between 1 and 3 (inclusive)`)
    })

    it('throws an error if a lower number is passed', () => {
        expect(betweenDef.formatAndValidate(0)).rejects.toThrow(`Value 0 should be between 1 and 3 (inclusive)`)
    })
})