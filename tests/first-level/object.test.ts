


import { _ } from '../../src/DefinitionClass.js'



describe(`Simple Object`, () => {

    const objectDef = _.object({ name: _.string(), number: _.number(), bool: _.boolean() })

    it('checks the return types of read or write as a string', () => {
        expect(objectDef.getTsTypeAsString()).toEqual({
            read: `{\n    'name'?: string\n    'number'?: number\n    'bool'?: boolean\n}`,
            write: `{\n    'name'?: string\n    'number'?: number\n    'bool'?: boolean\n}`,
        })
    })

    it('allows for additional properties', async () => {
        expect(
            await objectDef
                .formatAndValidate({ name: 22, number: '3', additionalProperty1: 23, addProperty2: 'myString' })
        )
            .toEqual({ name: '22', number: 3, additionalProperty1: 23, addProperty2: 'myString' })
    })

    it('throws an error if a string is passed', async () => {
        await expect(objectDef.formatAndValidate('myString'))
            .rejects.toThrow(/Expected type object but got type string for value "myString"/)
    })

    it('throws an error if a number is passed', async () => {
        await expect(objectDef.formatAndValidate(22))
            .rejects.toThrow(/Expected type object but got type number for value 22/)
    })

    it('throws an error if a boolean is passed', async () => {
        expect(
            objectDef.formatAndValidate({ name: true })
        ).rejects.toThrow(`Expected type string but got type boolean for value true`)
    })
})