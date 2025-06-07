import { isObject, recursiveGenericFunctionSync } from 'topkat-utils'
import { DefinitionObj, GoodCopDefinitionPartial } from '../definitionTypes.js'
import { Definition } from '../DefinitionClass.js'



export function mongoModelFieldsProcessing(model: DefinitionObj) {
  // ACCEPT NULL FOR ALL SUBOBJECTS that are not required as null is a valid mongo value
  recursiveGenericFunctionSync(model, (item: { _definitions: GoodCopDefinitionPartial[] }) => {
    if (
      item?._definitions
      && item._definitions.length
      && !item._definitions.some(d => d.required)
    ) {
      for (const definition of (item._definitions as GoodCopDefinitionPartial[])) {
        if (typeof definition.acceptNull !== 'boolean') definition.acceptNull = true
      }
    }
  }, {
    isObjectTestFunction: item => {
      return isObject(item) || item instanceof Definition
    }
  })
}