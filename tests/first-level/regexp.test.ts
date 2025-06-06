


import { _ } from '../../src/DefinitionClass.js'



describe(`Regexp`, () => {

    const regexString = 'string'
    const invalidRegexString = 'invalidString'
    const regexpDef = _.n('myRegExp').regexp(regexString)



    it('checks the return types of read or write as any', () => {
        expect(regexpDef.getTsTypeAsString()).toEqual({ 'read': 'any', 'write': 'any' })
    })

    it('allows for a matching regexp', async () => {
        expect(await regexpDef.formatAndValidate(regexString)).toEqual(regexString)
    })

    it(`throws err if regexp doesn't match`, async () => {
        await expect(regexpDef.formatAndValidate(invalidRegexString)).rejects
            .toThrowError(`Entry ${invalidRegexString} does not match ${regexString}`)
    })
})

describe(`Regexp with RegExp type`, () => {

    const regex = new RegExp('string')
    const invalidRegexString = 'invalidString'
    const regexpDefWithRegExp = _.n('myRegExp').regexp(regex)



    it('allows for a matching regexp with RegExp object', async () => {
        expect(await regexpDefWithRegExp.formatAndValidate('string')).toEqual('string')
    })

    it('throws an error for a non-matching regexp with RegExp object', async () => {
        await expect(regexpDefWithRegExp.formatAndValidate(invalidRegexString)).rejects
            .toThrowError(`Entry ${invalidRegexString} does not match ${regex.source}`)
    })

    it('checks the RegExp object flags', async () => {
        const regexWithFlags = new RegExp('string', 'i')
        const regexpDefWithFlags = _.n('myRegExp').regexp(regexWithFlags)

        expect(regexWithFlags.flags).toBe('i')

        // NOW valid because of I (cas insensitive flag)
        expect(await regexpDefWithFlags.formatAndValidate(invalidRegexString)).toEqual('invalidString')
    })
})
