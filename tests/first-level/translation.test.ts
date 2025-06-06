


import { _ } from '../../src/DefinitionClass.js'



describe(`Translation Object`, () => {

    const transDef = _.translation()

    it('checks the return types of read or write as a string', () => {
        expect(transDef.getTsTypeAsString()).toEqual({ 'read': 'TranslationObj', 'write': 'TranslationObj' })
    })

    it('accepts valid isoCodes as keys', async () => {
        expect(await transDef.formatAndValidate({ en: 'hello', fr: 'bonjour' }))
            .toEqual({ en: 'hello', fr: 'bonjour' })
    })

    it('throws an error if an isoCode is not present', async () => {
        await expect(transDef.formatAndValidate({ nonIsoCode: 'testman' }))
            .rejects.toThrowError(
                'Expected type { [countryCodeIso]: translationString } but got {"nonIsoCode":"testman"}'
            )
    })

    it('throws an error if an isoCode is not VALID', async () => {
        await expect(transDef.formatAndValidate({ xx: 'testman' }))
            .rejects.toThrowError(
                'Expected type { [countryCodeIso]: translationString } but got {"xx":"testman"}'
            )
    })
})
