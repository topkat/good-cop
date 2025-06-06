


import { _ } from '../../src/DefinitionClass.js'



describe(`Date`, () => {

    const now = new Date()
    const dateDef = _.date()

    it('checks the return types of read or write as any', () => {
        expect(dateDef.getTsTypeAsString()).toEqual({ 'read': 'Date', 'write': 'Date' })
    })

    it('accepts a valid date', async () => {
        expect(await dateDef.formatAndValidate(now)).toEqual(now)
    })

    it('throws an error when passed a string', async () => {
        await expect(dateDef.formatAndValidate('string')).rejects
            .toThrow('Expected type date but got "string"')
    })

    it('throws an error when passed a number', async () => {
        await expect(dateDef.formatAndValidate(1234)).rejects
            .toThrow('Expected type date but got 1234')
    })

    it('throws an error when passed a boolean', async () => {
        await expect(dateDef.formatAndValidate(true)).rejects
            .toThrow('Expected type date but got true')
    })
})