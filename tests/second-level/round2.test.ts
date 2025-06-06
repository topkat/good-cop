


import { _ } from '../../src/DefinitionClass.js'



describe(`Round2`, () => {

    const round2Def = _.number().round2()

    it('checks the return types of read or write as a string', () => {
        expect(round2Def.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('rounds up to two decimal places', async () => {
        expect(await round2Def.formatAndValidate(2.356)).toEqual(2.36)
    })

    it('rounds down to two decimal places', async () => {
        expect(await round2Def.formatAndValidate(2.354)).toEqual(2.35)
    })

    it('rounds up a ...5 value', async () => {
        expect(await round2Def.formatAndValidate(2.355)).toEqual(2.36)
    })
})