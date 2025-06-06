


import { _ } from './0_helpers/definitionWithModels.js'
import { complexObjectDef } from './0_helpers/complexObjectDef.js'



describe(`Swagger simple types validation`, () => {

  const stringType = _.string()

  it('checks Swager doc is generated correctly', async () => {
    expect(await stringType.getSwaggerType()).toEqual({
      example: '"rndmString"',
      type: 'string',
    })
  })
})

describe(`Swagger simple object validation`, () => {

  const objectType = _.object({ str: _.string(), bool: _.boolean() })

  it('checks Swager doc is generated correctly', async () => {
    expect(await objectType.getSwaggerType())
      .toEqual({ 'type': 'object', 'properties': { 'str': { 'type': 'string', 'example': '"rndmString"' }, 'bool': { 'type': 'boolean', 'example': 'true' } }, 'example': '{\n  "str": "\\"rndmString\\"",\n  "bool": "true"\n}' })
  })
})


describe(`Swagger simple array validation`, () => {

  const arrayType = _.array(_.string())

  it('checks Swager doc is generated correctly', async () => {
    expect(await arrayType.getSwaggerType())
      .toEqual({ 'type': 'array', 'items': { 'type': 'string', 'example': '"rndmString"' }, 'example': '["rndmString", "rndmString"]' })
  })
})



describe(`Swagger typesOr validation`, () => {

  const orType = _.typesOr([_.string(), _.boolean()])

  it('checks Swager doc is generated correctly', async () => {
    expect(await orType.getSwaggerType()
    ).toEqual({ 'oneOf': [{ 'type': 'string', 'example': '"rndmString"' }, { 'type': 'boolean', 'example': 'true' }], 'example': '"rndmString"' })
  })
})



describe(`Swagger COMPLEX types validation`, () => {

  const complexObject = _.object(complexObjectDef)

  it('checks Swager doc is generated correctly for COMPLEX OBJECT', async () => {
    expect(await complexObject.getSwaggerType())
      .toEqual({ 'type': 'object', 'properties': { 'str': { 'type': 'string', 'example': '"rndmString"' }, 'featuredCryptos': { 'type': 'array', 'items': { 'type': 'string', 'enum': ['a', 'b', 'c'], 'example': 'a' }, 'example': '[a, a]' }, 'arr': { 'type': 'array', 'items': { 'type': 'number', 'format': 'float', 'example': '12' }, 'example': '[12, 12]' }, 'enum': { 'type': 'string', 'enum': ['a', 'z'], 'example': 'a' }, 'float': { 'type': 'number', 'format': 'float', 'example': '2.12' }, 'integer': { 'type': 'integer', 'example': '289' }, 'false': { 'type': 'boolean', 'example': 'false' }, 'any': { 'type': {} }, 'genericObj': { 'type': 'object', 'example': '{ randomKey: true, nb: 4, info: "this is untyped" }' } }, 'example': '{\n  "str": "\\"rndmString\\"",\n  "featuredCryptos": "[a, a]",\n  "arr": "[12, 12]",\n  "enum": "a",\n  "float": "2.12",\n  "integer": "289",\n  "false": "false",\n  "genericObj": "{ randomKey: true, nb: 4, info: \\"this is untyped\\" }"\n}' })
  })

})










describe(`Swagger COMPLEX types validation MONGO MODEL`, () => {

  const mongoModel = _.model('bangk', 'exampleModel', 'Read')

  it('checks Swager doc is generated correctly for MONGO MODEL', async () => {
    expect(await mongoModel.getSwaggerType())
      .toEqual({ 'type': 'object', 'properties': { 'str': { 'type': 'string', 'example': '"rndmString"' }, 'featuredCryptos': { 'type': 'array', 'items': { 'type': 'string', 'enum': ['a', 'b', 'c'], 'example': 'a' }, 'example': '[a, a]' }, 'arr': { 'type': 'array', 'items': { 'type': 'number', 'format': 'float', 'example': '12' }, 'example': '[12, 12]' }, 'enum': { 'type': 'string', 'enum': ['a', 'z'], 'example': 'a' }, 'float': { 'type': 'number', 'format': 'float', 'example': '2.12' }, 'integer': { 'type': 'integer', 'example': '289' }, 'false': { 'type': 'boolean', 'example': 'false' }, 'any': { 'type': {} }, 'genericObj': { 'type': 'object', 'example': '{ randomKey: true, nb: 4, info: "this is untyped" }' }, '_id': { 'type': 'string', 'format': 'uuid', 'example': '"6776baf5c7c6e518aae88071"' }, 'lastUpdateDate': { 'type': 'string', 'format': 'date', 'example': '"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)"' }, 'lastUpdater': { 'oneOf': [{ 'type': 'string' }, { 'type': 'object' }], 'example': '"6776baf5c7c6e518aae88072"' } }, 'example': '{\n  "str": "\\"rndmString\\"",\n  "featuredCryptos": "[a, a]",\n  "arr": "[12, 12]",\n  "enum": "a",\n  "float": "2.12",\n  "integer": "289",\n  "false": "false",\n  "genericObj": "{ randomKey: true, nb: 4, info: \\"this is untyped\\" }",\n  "_id": "\\"6776baf5c7c6e518aae88071\\"",\n  "lastUpdateDate": "\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\"",\n  "lastUpdater": "\\"6776baf5c7c6e518aae88072\\""\n}' })
  })

})