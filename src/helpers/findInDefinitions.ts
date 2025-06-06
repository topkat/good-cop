

import { DefinitionPartial, DefinitionPartialFn, MainTypes } from '../definitionTypes.js'

type Defs = (DefinitionPartial | DefinitionPartialFn)[]

export function findTypeInDefinitions(definitions: Defs, type: MainTypes) {
  for (const def of definitions) {
    const { mainType } = typeof def === 'function' ? def() : def
    if (mainType === type) return true
  }
  return false
}

/** for all definitions of the object (eg [string, required]) it will find a defined value and return when the value is met the first time. Eg: for a value of 'isRequired', it will check all definitions for the first containing that field and return it's value */
export function getFieldValueForDefinitions<K extends keyof DefinitionPartial>(
  definitions: Defs,
  name: K
): DefinitionPartial[K] | void {
  for (const defRaw of definitions) {
    const def = typeof defRaw === 'function' ? defRaw() : defRaw
    if (typeof def?.[name] !== 'undefined') return def?.[name]
  }
}