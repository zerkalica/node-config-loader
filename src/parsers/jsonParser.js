// @flow

import type {FileRec, Parser} from '../interfaces'

export default function makeJsonParser(): Parser {
    return function jsonParser(file: FileRec): Object {
        return new Promise((resolve) =>
            resolve(JSON.parse(file.contents.toString()))
        )
        .catch(e => {
            e.message = file.path + ': ' + e.message
            throw e
        })
    }
}
