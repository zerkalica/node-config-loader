// @flow

import __debug from 'debug'
import path from 'path'

import type {FileRec} from 'node-config-loader/interfaces'

import defMerge from '../utils/merge'
import defParser from '../parsers'
import defReadFile from '../utils/readFile'

const debug = __debug('node-config-loader:scanner:debug')

export interface CreateScannerOpts {
    merge?: (acc: Object, src: Object) => Object;
    parser?: (data: FileRec) => Promise<Object>;
    readFile?: (fileName: string) => Promise<Buffer>;
}

export type Scanner = (files: string[]) => Promise<Object>

export default function createScanner(
    opts?: CreateScannerOpts = {}
): Scanner {
    const merge: (acc: Object, src: Object) => Object = opts.merge || defMerge
    const parser = opts.parser || defParser
    const readFile = opts.readFile || defReadFile
    const mergeReducer = (acc, src) => merge(acc, src)
    const mergeObjects = (objects: Object[]) => objects.reduce(mergeReducer, {})
    const rf = (file: string) => readFile(file)

    return function scanner(files: string[]): Promise<Object> {
        const strToData = (datas: Buffer[]) =>
            Promise.all(datas.map((contents: Buffer, i: number) =>
                parser({
                    contents,
                    path: files[i]
                })
            ))

        return Promise.all(files.map(rf))
            .then(strToData)
            .then(mergeObjects)
    }
}
