/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
        }],
        '^.+\\.js$': ['babel-jest', {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testRegex: ['.*\\.test\\.[jt]sx?$'],
}

export default config
