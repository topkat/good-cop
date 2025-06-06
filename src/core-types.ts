

export type MaybeArray<T> = T | T[]
export type MaybePromise<T> = T | Promise<T>

export type User = {
  _id: string
  role: string
  [k: string]: any
}

export type ObjectWithNoFn = { [name: string]: NotFunction<any> }

type NotFunction<T> = T extends Function ? never : T


export type TranslationObj = { [countryIsoCode in CountryCodeIso]?: string }

// https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined
export type NoExtraProperties<T, U extends T = T> = U & MakeObjKeysAsNever<Exclude<keyof U, keyof T>>
type MakeObjKeysAsNever<K extends keyof any> = { [P in K]: never }


export const countryIsoCodes = [
  'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az',
  'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz',
  'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz',
  'de', 'dj', 'dk', 'dm', 'do', 'dz',
  'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'en',
  'fi', 'fj', 'fk', 'fm', 'fo', 'fr',
  'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy',
  'hk', 'hm', 'hn', 'hr', 'ht', 'hu',
  'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it',
  'je', 'jm', 'jo', 'jp',
  'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz',
  'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly',
  'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz',
  'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz',
  'om',
  'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'pt', 'pw', 'py',
  'qa',
  're', 'ro', 'rs', 'ru', 'rw',
  'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz',
  'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz',
  'ua', 'ug', 'um', 'us', 'uy', 'uz',
  'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu',
  'wf', 'ws',
  'ye', 'yt',
  'za', 'zm', 'zw'
] as const

export type CountryCodeIso = typeof countryIsoCodes[number]