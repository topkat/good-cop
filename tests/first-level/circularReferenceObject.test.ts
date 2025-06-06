process.env.GOOD_COP_MAX_RECURSION_DEPTH = '5'

import { _ } from '../../src/DefinitionClass.js'






describe('Circular object ref test', () => {


  const circularEmulateDefinition = _.object({
    dueDiligenceReferences: _.array(_.object({
      date: _.date().default(() => new Date()),
      reference: _.string().required(),
      status: _.enum(['cool', 'bad']).default('cool'),
    }))
  })


  it('Check arr of obj', async () => {
    await expect(circularEmulateDefinition.getSwaggerType())
      .toEqual({ 'type': 'object', 'properties': { 'dueDiligenceReferences': { 'type': 'array', 'items': { 'type': 'object', 'properties': { 'date': { 'type': 'string', 'format': 'date', 'example': '"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)"' }, 'reference': { 'type': 'string', 'example': '"rndmString"' }, 'status': { 'type': 'string', 'enum': ['cool', 'bad'], 'example': 'cool' } }, 'example': '{\n  "date": "\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\"",\n  "reference": "\\"rndmString\\"",\n  "status": "cool"\n}' }, 'example': '[{\n  "date": "\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\"",\n  "reference": "\\"rndmString\\"",\n  "status": "cool"\n}, {\n  "date": "\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\"",\n  "reference": "\\"rndmString\\"",\n  "status": "cool"\n}]' } }, 'example': '{\n  "dueDiligenceReferences": "[{\\n  \\"date\\": \\"\\\\\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\\\\\"\\",\\n  \\"reference\\": \\"\\\\\\"rndmString\\\\\\"\\",\\n  \\"status\\": \\"cool\\"\\n}, {\\n  \\"date\\": \\"\\\\\\"Fri Jan 03 2012 13:13:25 GMT+0100 (Central European Standard Time)\\\\\\"\\",\\n  \\"reference\\": \\"\\\\\\"rndmString\\\\\\"\\",\\n  \\"status\\": \\"cool\\"\\n}]"\n}' })
  })


})






describe('Circular object ref test', () => {

  process.env.GOOD_COP_MAX_RECURSION_DEPTH = '5'

  const o = {
    o: _.object({
      o1: _.object({
        o2: _.object({
          o3: _.object({
            o4: _.object({
              o5: _.object({
                o6: _.object({
                  o7: _.object({
                    o8: _.object({
                      o9: _.object({ a: _.number() }) // YOOOO!!! LA FUSÉÉEEE!!!
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  const circularEmulateDefinition = _.object(o)


  it('Check getExampleValue', async () => {
    await expect(circularEmulateDefinition.getExampleValue())
      .toEqual('{\n  "o": "{\\n  \\"o1\\": \\"{\\\\n  \\\\\\"o2\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o3\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}')
  })

  it('Check getTsTypeAsString', async () => {
    await expect(circularEmulateDefinition.getTsTypeAsString())
      .toEqual({ 'read': '{\n    \'o\'?: {\n        \'o1\'?: {\n            \'o2\'?: {\n                \'o3\'?: {\n                    \'o4\'?: any\n                }\n            }\n        }\n    }\n}', 'write': '{\n    \'o\'?: {\n        \'o1\'?: {\n            \'o2\'?: {\n                \'o3\'?: {\n                    \'o4\'?: any\n                }\n            }\n        }\n    }\n}' })
  })

  it('Check getSwaggerType', async () => {
    await expect(circularEmulateDefinition.getSwaggerType())
      .toEqual({ 'type': 'object', 'properties': { 'o': { 'type': 'object', 'properties': { 'o1': { 'type': 'object', 'properties': { 'o2': { 'type': 'object', 'properties': { 'o3': { 'type': 'object', 'properties': { 'o4': { 'type': {} } }, 'example': '{\n  "o4": "{\\n  \\"o5\\": \\"{\\\\n  \\\\\\"o6\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o7\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}' } }, 'example': '{\n  "o3": "{\\n  \\"o4\\": \\"{\\\\n  \\\\\\"o5\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o6\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}' } }, 'example': '{\n  "o2": "{\\n  \\"o3\\": \\"{\\\\n  \\\\\\"o4\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o5\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}' } }, 'example': '{\n  "o1": "{\\n  \\"o2\\": \\"{\\\\n  \\\\\\"o3\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o4\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}' } }, 'example': '{\n  "o": "{\\n  \\"o1\\": \\"{\\\\n  \\\\\\"o2\\\\\\": \\\\\\"{\\\\\\\\n  \\\\\\\\\\\\\\"o3\\\\\\\\\\\\\\": \\\\\\\\\\\\\\"{}\\\\\\\\\\\\\\"\\\\\\\\n}\\\\\\"\\\\n}\\"\\n}"\n}' })

  })


  // THOSES ARE HARD TO TEST


  // const val = { o: { o1: { o2: { o3: { o4: { o5: { o6: { o7: { o8: { o9: { a: 'ShallNotPass' }, } } } } } } } } } }


  // it('Check formatAndValidate', async () => {
  //   await expect(circularEmulateDefinition.formatAndValidate(val))
  //     .rejects.toThrow('Expected type date but got true')
  // })


  // it('Check _getDefinitionObjFlat', async () => {
  //   console.log('AAAAAAAAA', JSON.stringify(circularEmulateDefinition._getDefinitionObjFlat(), null))
  //   await expect(circularEmulateDefinition._getDefinitionObjFlat())
  //     .rejects.toThrow('Expected type date but got true')

  // })

})