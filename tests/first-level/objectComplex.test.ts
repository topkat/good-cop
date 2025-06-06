


import { _ } from '../../src/DefinitionClass.js'



describe(`Complex Object`, () => {

    const objDef = _.object({
        arr: [_.string()],
        arr2: _.array(_.string()),
        subObj: {
            name: _.enum(['a', 'b']),
            tuple: _.tuple([_.string(), _.date()]),
            typeOr: _.typesOr([_.number(), _.boolean()]),
            subArr: [_.email()]
        }
    })

    it('checks the return types of read or write as a string', () => {
        expect(objDef.getTsTypeAsString()).toEqual({
            read: `{\n    'arr'?: Array<string>\n    'arr2'?: Array<string>\n    'subObj'?: {\n        'name'?: 'a' | 'b'\n        'tuple'?: [string, Date]\n        'typeOr'?: number | boolean\n        'subArr'?: Array<string>\n    }\n}`,
            write: `{\n    'arr'?: Array<string>\n    'arr2'?: Array<string>\n    'subObj'?: {\n        'name'?: 'a' | 'b'\n        'tuple'?: [string, Date]\n        'typeOr'?: number | boolean\n        'subArr'?: Array<string>\n    }\n}`,
        })
    })

    const rightSubobj = {
        name: 'a',
        tuple: ['a', new Date()],
        typeOr: true, // or bool
        subArr: ['aa@aa.aa', 'bb@bb.bb']
    }
    const rightBody = {
        arr: ['a', 'b', 'c', 'd'],
        arr2: ['a', 'b', 'c', 'd'],
        subObj: rightSubobj
    }

    it('obj OK', async () => {
        expect(await objDef.formatAndValidate(rightBody)).toEqual(rightBody)
    })

    const wrongArr = { ...rightBody, arr: [null, 'r', true] }

    it('wrongArr in obj', async () => {
        // TODO check error return
        expect(async () => await objDef.formatAndValidate(wrongArr)).rejects.toThrow(`Expected type string but got type object for value null`)
    })

    const wrongArrTyple = { ...rightBody, subObj: { ...rightSubobj, tuple: ['a', false] } }

    it('wrongArrTyple', async () => {
        expect(async () => await objDef.formatAndValidate(wrongArrTyple)).rejects.toThrow(`Expected type date but got false`)
    })

    const typesOrSecondType = { ...rightBody, subObj: { ...rightSubobj, typeOr: 9 } }

    it('typesOr second type OK', async () => {
        const formatted = await objDef.formatAndValidate(typesOrSecondType)
        expect(formatted).toEqual(typesOrSecondType)
    })

    const typesOrWrongType = { ...rightBody, subObj: { ...rightSubobj, typeOr: [null, 2] } }

    it('typesOrWrongType', async () => {
        expect(async () => await objDef.formatAndValidate(typesOrWrongType)).rejects.toThrow(`Value [null,2] should be one of the following types: number, boolean`)
    })

})




describe(`Object with enum`, () => {

    const typesOrDef = _.object({ a: _.enum(['a', 'b']) })


    it(`Mixed type wrong`, async () => {
        await expect(typesOrDef.formatAndValidate({ a: 'c' })).rejects.toThrow(`Value "c" does not match allowed values a,b`)
    })

})