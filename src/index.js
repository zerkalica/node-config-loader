// @flow

import loadConfig from './loadConfig'
import getFiles from './core/getFiles'
import createScanner from './core/createScanner'

import merge from './utils/merge'
import strMap from './utils/strMap'

export type {GetFilesOptions} from './core/getFiles'

export type {LoadConfigOptions} from './loadConfig'

export {
    getFiles,
    createScanner,
    loadConfig,
    merge,
    strMap
}
