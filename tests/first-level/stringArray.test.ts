


import { _ } from '../../src/DefinitionClass.js'



describe(`Array of strings`, () => {

    const stringArrayDef = _.array(_.string())



    it('stringArrayDef', () => {
        expect(stringArrayDef.getTsTypeAsString())
            .toEqual({ 'read': 'Array<string>', 'write': 'Array<string>' })
    })

    it('accepts an array of strings', async () => {
        expect(await stringArrayDef.formatAndValidate(['myString1', 'myString2']))
            .toEqual(['myString1', 'myString2'])
    })

    it('converts an array of numbers to an array of strings', async () => {
        expect(await stringArrayDef.formatAndValidate([1, 2]))
            .toEqual(['1', '2'])
    })

    it('converts an array of string and number to strings', async () => {
        expect(await stringArrayDef.formatAndValidate(['myString1', 1]))
            .toEqual(['myString1', '1'])
    })

    it('throws an error when null is passed', async () => {
        expect(stringArrayDef.formatAndValidate(null))
            .rejects.toThrow(`Expected type array but got type object for value null`)
    })

    it('throws an error if a boolean is passed', async () => {
        expect(stringArrayDef.formatAndValidate(['myString1', true]))
            .rejects.toThrow(`Expected type string but got type boolean for value true`)
    })

    it('throws an error if an object is passed', async () => {
        expect(stringArrayDef.formatAndValidate(['myString1', { id: 'id' }])).rejects.toThrow('Expected type string but got type object')
    })

})