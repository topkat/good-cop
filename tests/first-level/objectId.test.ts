


import { _ } from '../../src/DefinitionClass.js'


//ATT: not sure the difference between this and object?
describe(`Object Id`, () => {

    const objectDef = _.objectId()

    it(`Check it doesn't accept empty string`, async () => {
        await expect(objectDef.formatAndValidate(''))
            .rejects.toThrow(`Expected type objectId but got type string for value ""`)
    })

    it(`Check it doesn't accept string greater than 24 characters`, async () => {
        await expect(objectDef.formatAndValidate('azertyuiopqsdfghjklmwxcvbn'))
            .rejects.toThrow(`Expected type objectId but got type string for value "azertyuiopqsdfghjklmwxcvbn"`)
    })

    it(`Check it doesn't accept string less than 24 characters`, async () => {
        await expect(objectDef.formatAndValidate('azertyuiopqsd'))
            .rejects.toThrow(`Expected type objectId but got type string for value "azertyuiopqsd"`)
    })

    it(`Valid objectId 24 characters`, async () => {
        expect(await objectDef.formatAndValidate('671207eeff7ff7df430c20bf')).toEqual('671207eeff7ff7df430c20bf')
    })

})