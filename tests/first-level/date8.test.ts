


import { _ } from '../../src/DefinitionClass.js'



describe(`Date8`, () => {

    const validDateString = '20231113'
    // const invalidDateString = '20231332'

    const date8Def = _.date8()

    it('checks the return types of read or write as any', () => {
        expect(date8Def.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('validates and formats a valid 8-digit date string', async () => {
        await expect(date8Def.formatAndValidate(validDateString)).resolves.toEqual(20231113)
    })

    it('validates and formats a valid 8-digit date number', async () => {
        await expect(date8Def.formatAndValidate(20231113)).resolves.toEqual(20231113)
    })

    //ATT: this is still resolving, need to fix logic for INVALID DATE
    // it('throws an error for an invalid 8-digit date string', async () => {
    //     await expect(date8Def.formatAndValidate(invalidDateString)).rejects.toThrow('Expected type date8 but got "20231332"');
    // }); 
})