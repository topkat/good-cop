


import { _ } from '../../src/DefinitionClass.js'



describe(`Required and optional object properties`, () => {

    const reqOptDefObj = _.object({ name: _.string().required(), number: _.number(), boolean: _.boolean() })



    it('checks the return types of read or write as a string', () => {
        expect(reqOptDefObj.getTsTypeAsString()).toEqual({
            read: `{\n    'name': string\n    'number'?: number\n    'boolean'?: boolean\n}`,
            write: `{\n    'name': string\n    'number'?: number\n    'boolean'?: boolean\n}`,
        })
    })

    it('allows for optional to be secluded', async () => {
        expect(
            await reqOptDefObj
                .formatAndValidate({ name: 'testman' })
        )
            .toEqual({ name: 'testman' })
    })

    it('throws an error if required is not passed', async () => {
        await expect(reqOptDefObj.formatAndValidate({ age: 25, boolean: true }))
            .rejects.toThrow(`Field name is required`);
    });
})