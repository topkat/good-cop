


import { _ } from '../../src/DefinitionClass.js';



describe('Default', () => {
    const defaultDef = _.string().default('default');

    it('returns the default value if the input is undefined', async () => {
        expect(await defaultDef.formatAndValidate(undefined)).toEqual('default');
    });

    it('returns the input value if it is defined', async () => {
        expect(await defaultDef.formatAndValidate('custom value')).toEqual('custom value');
    });

    it('supports a default value as a function', async () => {
        const dynamicDefault = _.undefined().default(ctx => `dynamic value based on ${ctx.value}`);
        expect(await dynamicDefault.formatAndValidate(undefined)).toEqual('dynamic value based on undefined');
    });

    it('applies the default value to nested schemas', async () => {
        const nestedDef = _.object({
            name: _.string().default('Anonymous'),
            age: _.number().default(18),
        });
        const result = await nestedDef.formatAndValidate({});
        expect(result).toEqual({ name: 'Anonymous', age: 18 });
    });

    it('uses the provided value over the default in nested schemas', async () => {
        const nestedDef = _.object({
            name: _.string().default('Anonymous'),
            age: _.number().default(18),
        });
        const result = await nestedDef.formatAndValidate({ name: 'John Doe', age: 25 });
        expect(result).toEqual({ name: 'John Doe', age: 25 });
    });

    it('supports various default value types', async () => {
        expect(await _.undefined().default(123).formatAndValidate(undefined)).toEqual(123);
        expect(await _.undefined().default(true).formatAndValidate(undefined)).toEqual(true);
        expect(await _.undefined().default([1, 2, 3]).formatAndValidate(undefined)).toEqual([1, 2, 3]);
        expect(await _.undefined().default({ key: 'value' }).formatAndValidate(undefined)).toEqual({
            key: 'value',
        });
        expect(await _.undefined().default(null).formatAndValidate(undefined)).toEqual(null);
    });
});
