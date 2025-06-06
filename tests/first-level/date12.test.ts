


import { _ } from '../../src/DefinitionClass.js'



describe(`Date12`, () => {

    const validDateString = '202412121212'
    // const invalidDateString = '202313321212'

    const date12Def = _.date12()

    it('checks the return types of read or write as any', () => {
        expect(date12Def.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('validates and formats a valid 12-digit date string', async () => {
        await expect(date12Def.formatAndValidate(validDateString)).resolves.toEqual(202412121212);
    });

    it('validates and formats a valid 12-digit date number', async () => {
        await expect(date12Def.formatAndValidate(202412121212)).resolves.toEqual(202412121212);
    });

    //ATT: this is still resolving, need to fix logic for INVALID DATE
    // it('throws an error for an invalid 12-digit date string', async () => {
    //     await expect(date8Def.formatAndValidate(invalidDateString)).rejects.toThrow('Expected type date12 but got "202412121212"');
    // }); 
})