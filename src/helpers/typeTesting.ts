// //  ══╦══ ╦   ╦ ╔══╗ ╔══╗   ══╦══ ╔══╗ ╔═══ ══╦══ ═╦═ ╦╗ ╔ ╔══╗
// //    ║   ╚═╦═╝ ╠══╝ ╠═       ║   ╠═   ╚══╗   ║    ║  ║╚╗║ ║ ═╦
// //    ╩     ╩   ╩    ╚══╝     ╩   ╚══╝ ═══╝   ╩   ═╩═ ╩ ╚╩ ╚══╝

// import { Definition } from '../DefinitionClass.js'

// // /!\ DONT DELETE /!\

// type Modelssss = {
//     aa: {
//         bb: { Read: { a: number }, Write: { a: number } }
//     }
// }

// const __ = new Definition<Modelssss>().init()

// const hardCodedString = __.stringConstant('tt').tsTypeRead
// const normalstring = __.string().tsTypeRead
// const hardCodedString2 = __.stringConstant('coucou').tsTypeRead

// const populated = __.ref('bb', true).tsTypeRead
// const notPop = __.ref('bb').tsTypeRead


// /* BASE TYPES */
// const isRequired = __.string().required().lowerCase().isRequiredType
// const isRequiredFalse = __.string().lowerCase().isRequiredType
// const strWZ = __.string().lowerCase().tsTypeWrite
// const str2 = __.string().tsTypeRead
// const lengthTest0 = __.string().maxLength(3).tsTypeRead
// const lengthTest = __.string().maxLength(3).lowerCase().minLength(4).tsTypeRead
// const arrLength = __.array(_.string()).minLength(3).tsTypeRead

// // OBJECTS
// const obj0 = __.object({ name: __.string().required() }).tsTypeRead
// const obj01 = __.object({ name: __.string() }).tsTypeRead
// const obj1 = __.object({ name: __.string() }).mergeWith({ email: __.email().required() }).tsTypeRead
// const obj2 = __.object({ name: __.string() }).mergeWith({ email: __.email().required() }).partial()
// const obj3 = __.object({ name: __.string() }).mergeWith({ email: __.email().required() }).complete()
// const complexOne = __.object({
//     arr: [__.string()],
//     arr2: __.array(__.string()),
//     subObj: {
//         name: __.enum(['a', 'b']),
//         tuple: __.tuple([__.string(), __.date()]),
//         typeOr: __.typesOr([__.number(), __.boolean()]),
//         subArr: [__.email()]
//     }
// }).tsTypeRead

// const or = __.typesOr([__.string(), __.number(), __.boolean()]).tsTypeRead

// const tuple2 = __.tuple([__.string(), __.number()]).tsTypeRead
// const myTuple = ['re', 4] as typeof tuple2



// const hardcoreArray = __.array({ name: __.string(), subObj: { bool: __.boolean().required() }, arr2: __.array({ subArr: __.array({ name: __.string() }) }) })
// type HardcoreArray = typeof hardcoreArray.tsTypeRead

// const simpleArray = __.array({ name: __.string() })
// type SimpleArray = typeof simpleArray.tsTypeRead

// const hardcoreObject = __.object({ name: __.string(), arr1: __.email(), arr2: __.array({ subArr: __.array({ name: __.string() }) }) })
// type HardcoreObject = typeof hardcoreObject.tsTypeRead



// const aa = __.n('userFields').object({
//     screenSize: __.string().required(),
//     deviceId: __.string().required(),
//     phonePrefix: __.regexp(/^\+\d+$/).required(),
//     phoneNumber: __.string().minLength(7).maxLength(17).required(),
//     lang: __.enum(['en', 'fr']).required(),
//     currency: __.enum(['eur', 'usd']).required(),
// }).required()

// type ObjectType = typeof aa.tsTypeRead
