              ,   
         _.-"` `'_  _________________________________________________________
     __ '._ __{}_/       __________  ____  ____     __________  ____        /\
    ||||  |'--.__\      / ____/ __ \/ __ \/ __ \   / ____/ __ \/ __ \      / /
    |  L.(   ^ \^      / / __/ / / / / / / / / /  / /   / / / / /_/ /     / /
    \ .-' |   _'|     / /_/ / /_/ / /_/ / /_/ /  / /___/ /_/ / ____/     / /
    | |   )\___/      \____/\____/\____/_____/   \____/\____/_/         / /
    |  \-'`:._] _______________________________________________________/ /
    \__/;      '-. ____________________________________________________\/


> This library is a personal work, actually used in production apps feel free to contact me via github to collaborate or for feature request

# VALIDATION LIBRARY (zod like)

* Infer typescript types
* **Generate typescript types as string** to use in file generation
* **Generate mongo schemas** from types, so you can create database models with it
* **Generate swagger doc** like syntax
* Format and Validation
* Can return a different type (ts and validation) depending of a method (create, update, delete...). 
  * Eg: When using `.required()`, you usually want to throw an error on `create` but not on `update`
  * Also, when required, the typescript prop type in an object will be required (`myProp: val` instead of `myProp: val`) so you wont have to check for undefined before accessing the value
  * Eg2: in a mongo model, you usually want _id field to be mandatory in an object type on read but not on write

# Why not using zod ?

The need to generate types as string and mongo models was the top reason for that. Zod is also a very heavy and the code is very hard to read / modify, so a fork was not planned. On the other side I try to keep good-cop within a few files that are easy to maintain and augment (I can easily add anything to like generate swagger doc...). The downside of that is that JS and TS are developped in parallel (see Definition.ts header for more infos) and this can lead to little but some inconsistencies in chaining function syntax, like chaining a string method to a number in rare cases

# Examples

``` typescript

import { _, InferType } from 'good-cop/frontend'

const strDef = _.string().optional()

const objDef = _.object({ 
  string: _.string().required(), 
  enum: _.enum(
    _.number().min(0).max(100).round2(),
    _.boolean()
  ),
  arr: [_.email()],
  otherArr: _.array(_.url()).maxLength(3).required(),
  subObj: {
    subField: _.genericObject('fieldName', { date: _.date() }), // tsType: { [fieldName: string]: { date: Date } }
    regexp: _.string().regexp(/my\sregexp/),
  }
})

type Obj = InferType<typeof objDef>
/* 
The above type is interpreted as
{
  string: string
  enum?: [ number, boolean ]
  arr?: string[]
  otherArr: string[]
  subObj?: {
    subField?: { [fieldName: string]: { date: Date } }
    regexp?: string
  }
}
*/

```

# Mongo models


``` typescript
import { _, InferTypeRead, InferTypeWrite } from 'good-cop/frontend'

const _ = new Definition<{
  default: { // instead of default you can also have multiple databases
    [modelName: 'user' | 'organization']: any 
  }
}>({ 
  default: {
    user,
    organization
  } 
}).init() // the .init is necessary for the types suggestions to work best

const user = _.mongoModel(
  ['creationDate'], // those fields will be autoCreated and will appear as always defined on read method but not required in write
  {
    firstName: _.string(),
    org: _.ref('organization')
  }
)

type userWrite = InferTypeWrite<typeof user> // this is the type that may be used in a create or an update function

type userRead = InferTypeRead<typeof user> // this is the default and may be used for data outputted by the database

const organization = _.mongoModel([], { name: _.string() }})


```
