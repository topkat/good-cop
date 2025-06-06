import { Definition, _ as _2 } from '../../src/DefinitionClass.js'
import { EnumVals, complexObjectDef } from './complexObjectDef.js'




type ExampleModel = {
  enumArray: Array<EnumVals>
}

type ExampleModelWrite = {
  'featuredCryptos'?: any
  '_id'?: string
  'lastUpdateDate'?: Date
  'lastUpdater'?: string
}



export const _ = new Definition<{
  bangk: {
    exampleModel: {
      Write: ExampleModelWrite
      Read: ExampleModel
    }
  },
}>(() => ({
  bangk: {
    exampleModel: _2.mongoModel(['lastUpdateDate', 'lastUpdater'], complexObjectDef)
  },
})).init()