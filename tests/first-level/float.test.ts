


import { _ } from '../../src/DefinitionClass.js'



describe('Floating-point definition', () => {

    const floatingPointDef = _.float()

    it('checks the return types of read or write as a string', () => {
        expect(floatingPointDef.getTsTypeAsString()).toEqual({ 'read': 'number', 'write': 'number' })
    })

    it('accepts a valid floating-point', async () => {
        expect(await floatingPointDef.formatAndValidate(42.2)).toEqual(42.2)
    })

    it('accepts a negative floating-point', async () => {
        expect(await floatingPointDef.formatAndValidate(-42.2)).toEqual(-42.2)
    })

    it('accepts zero', async () => {
        expect(await floatingPointDef.formatAndValidate(0)).toEqual(0)
    })

    it('converts a string to a floating-point', async () => {
        expect(await floatingPointDef.formatAndValidate('42.2')).toEqual(42.2)
    })

    it('returns NaN when passed a string', async () => {
        await expect(floatingPointDef.formatAndValidate('hello'))
            .rejects.toThrow(`Expected type number but got type NaN for value null`)
    }
    )

    it('returns NaN when passed an array', async () =>
        await expect(floatingPointDef.formatAndValidate(['test', 1]))
            .rejects.toThrow(`Expected type number but got type NaN for value null`)
    )

    it('returns NaN when passed an object', async () =>
        await expect(floatingPointDef.formatAndValidate({ number: 6 }))
            .rejects.toThrow(`Expected type number but got type NaN for value null`)
    )
})