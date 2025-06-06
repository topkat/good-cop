
import { _ } from '../../src/DefinitionClass.js'


export const enumVals = ['a', 'b', 'c'] as const
export type EnumVals = typeof enumVals[number]

export const complexObjectDef = {
  str: _.string(),
  featuredCryptos: _.array(_.enum(enumVals)).default([]),
  obj: {
    subProp: _.boolean().required(),
    subArray: [_.string()]
  },
  arr: _.array(_.number()),
  enum: _.enum(['a', 'z']),
  float: _.float(),
  integer: _.integer(),
  false: _.false(),
  any: _.any(),
  genericObj: _.genericObject('keyz', _.string()),
}