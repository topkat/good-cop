
import mongoose from 'mongoose' // only used for typings, may not be compatible if used in frontend
import { MongoTypesString } from '../definitionTypes.js'

export const mongoTypeMapping: { [k in MongoTypesString]: MongoTypes } = {
  boolean: Boolean,
  number: Number,
  string: String,
  date: Date,
  object: Object,
  objectId: mongoose.Schema.Types.ObjectId,
  mixed: mongoose.Schema.Types.Mixed,
}

export type MongoFieldsRead<T extends string> = { _id: string } & { [K in T]: string }

export type MongoFieldsWrite = { _id?: string }

export type MongoTypes = Date | Number | Boolean | String | Object | typeof mongoose.Schema.Types.Mixed
export type MongoTypeObj = { type?: MongoTypes, ref?: string, unique?: boolean }


// TODO remove this functional code
export const systemUserId = '777fffffffffffffffffffff' // same are used in good-cop config
export const publicUserId = '000fffffffffffffffffffff'
export const isAnonymousUser = id => [systemUserId, publicUserId].includes(id)