// @flow

import type {Parser} from './interfaces'

import getFiles from './core/getFiles'
import type {GetFilesOptions} from './core/getFiles'

import type {CreateScannerOpts} from './core/createScanner'
import createScanner from './core/createScanner'

export interface LoadConfigOptions extends GetFilesOptions, CreateScannerOpts {}

export default function loadConfig(opts: LoadConfigOptions): Promise<Object> {
    return getFiles(opts).then(createScanner(opts))
}
