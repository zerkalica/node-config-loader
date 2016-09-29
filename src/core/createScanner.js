// @flow

import __debug from 'debug'
import path from 'path'

import type {FileRec} from '../interfaces'

import defMerge from '../utils/merge'
import defParser from '../parsers'
import defReadFile from '../utils/readFile'

const debug = __debug('node-config-loader:createScanner:debug')

export interface CreateScannerOpts {
    merge?: (src: Object[]) => Object;
    parser?: (data: FileRec) => Promise<Object>;
    readFile?: (fileName: string) => Promise<Buffer>;
}

export type Scanner = (files: string[]) => Promise<Object>

export default function createScanner(
    opts?: CreateScannerOpts = {}
): Scanner {
    const merge: (src: Object[]) => Object = opts.merge || defMerge
    const parser = opts.parser || defParser
    const readFile = opts.readFile || defReadFile
    const rf = (file: string) => readFile(file)

    return function scanner(files: string[]): Promise<Object> {
        debug('files: %s', files.join('\n'))
        const strToData = (datas: Buffer[]) =>
            Promise.all(datas.map((contents: Buffer, i: number) =>
                parser({
                    contents,
                    path: files[i]
                })
            ))

        return Promise.all(files.map(rf))
            .then(strToData)
            .then(merge)
    }
}
