


import { _ } from '../../src/DefinitionClass.js'



describe(`Object with additional properties not allowed`, () => {

    const objectDef = _.object({ name: _.string(), number: _.number() }, { deleteForeignKeys: true })

    it('checks the return types of read or write as a string', () => {
        expect(objectDef.getTsTypeAsString()).toEqual({
            read: `{\n    'name'?: string\n    'number'?: number\n}`,
            write: `{\n    'name'?: string\n    'number'?: number\n}`,
        });
    });

    it('removes additional properties from the defined object', async () => {
        expect(
            await objectDef.formatAndValidate({ name: 22, number: '3', additionalField: 'myString' })
        ).toEqual({ name: '22', number: 3 })
    })
})