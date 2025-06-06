


import { _ } from '../../src/DefinitionClass.js'



describe(`Length`, () => {

    const stringDef = _.string().length(3)
    const arrayDef = _.array(_.string()).length(3)

    it('checks the return types of read or write as a string', () => {
        expect(stringDef.getTsTypeAsString()).toEqual({ 'read': 'string', 'write': 'string' })
    })

    it('accepts the length value', async () => {
        expect(await stringDef.formatAndValidate('hey')).toEqual('hey')
    })

    it('throws an error if length of string is less', () => {
        expect(stringDef.formatAndValidate('hi')).rejects.toThrow(`Wrong length for value 'hi'. Expected length (=== 3) but got length (=== 2)`)
    })

    it('throws an error if length of array is less', () => {
        expect(arrayDef.formatAndValidate([1, 2])).rejects.toThrow(`Wrong length for value '1,2'. Expected length (=== 3) but got length (=== 2)`)
    })

    it('throws an error if length is more', () => {
        expect(stringDef.formatAndValidate('hello')).rejects.toThrow(`Wrong length for value 'hello'. Expected length (=== 3) but got length (=== 5)`)
    })
})