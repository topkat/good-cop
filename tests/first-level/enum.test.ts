


import { _ } from '../../src/DefinitionClass.js'



describe('Enum Validation', () => {
    const enumDef = _.enum(['string1', 'string2'])

    it('checks the return types of read or write as a string', () => {
        expect(enumDef.getTsTypeAsString()).toEqual({
            read: `'string1' | 'string2'`,
            write: `'string1' | 'string2'`
        })
    })

    it('accepts individual strings and validates them', async () => {
        const validValue: Array<typeof enumDef.tsTypeRead> = ['string1', 'string2']

        for (const value of validValue) {
            const result = await enumDef.formatAndValidate(value)
            expect(result).toEqual(value)
        }
    })

    it('throws an error if elements do not match', async () => {
        const inValidValues = [1, 2]

        for (const value of inValidValues) {
            await expect(enumDef.formatAndValidate(value)).rejects.toThrow(`Value "${value}" does not match allowed values string1,string2`)
        }
    })

    it('throws an error for empty strings', async () => {
        await expect(enumDef.formatAndValidate('')).rejects.toThrow('Value "" does not match allowed values string1,string2')
    })

    it('throws an error for null or undefined', async () => {
        await expect(enumDef.formatAndValidate(null)).rejects.toThrow('Value "null" does not match allowed values string1,string2')
    })

    //ATT: is this the correct behaviour?
    it('resolves to undefined', async () => {
        expect(await enumDef.formatAndValidate(undefined)).toEqual(undefined)
    })

    it('throws an error for mixed types like objects or arrays', async () => {
        const mixedValues = [{}, [], true]

        for (const value of mixedValues) {
            await expect(enumDef.formatAndValidate(value)).rejects.toThrow(`Value "${value}" does not match allowed values string1,string2`)
        }
    })

    it('throws an error for incorrect casing', async () => {
        const incorrectCaseValues = ['String1', 'STRING2']

        for (const value of incorrectCaseValues) {
            await expect(enumDef.formatAndValidate(value)).rejects.toThrow(`Value "${value}" does not match allowed values string1,string2`)
        }
    })

    it('trims strings with extra spaces', async () => {
        const result = await enumDef.formatAndValidate(' string1 ')
        expect(result).toEqual('string1')
    })

    it('throws an error for values with internal spaces', async () => {
        await expect(enumDef.formatAndValidate('str ing1')).rejects.toThrow(`Value "str ing1" does not match allowed values string1,string2`)
    })
})
