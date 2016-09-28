// @flow

import type {FileRec, Parser} from '../interfaces'

export default function makeJsParser(): Parser {
    return function jsParser(file: FileRec): Object {
        return new Promise(resolve => {
            resolve((require: any)(file.path))
        })
        .catch(e => {
            e.message = file.path + ': ' + e.message
            throw e
        })
    }
}
