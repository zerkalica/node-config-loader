// @flow

import type {FileRec, Parser} from '../interfaces'

import path from 'path'

/**
 * StrategyAdapter
 * @param {Adapter[file_extension]} adapters
 */
export default function makeStrategyParser(
    adapters?: {[ext: string]: Parser} = {}
): Parser {
    return function strategyParser(file: FileRec): Object {
        const ext: string = path.extname(file.path).substring(1)

        return new Promise((resolve, reject) => {
            if (!adapters[ext]) {
                reject(new Error(file.path + ': adapter not found for file ext ' + ext))
            } else {
                return resolve(adapters[ext](file))
            }
        })
    }
}
