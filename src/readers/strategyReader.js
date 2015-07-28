import path from 'path'

/**
 * StrategyAdapter
 * @param {Adapter[file_extension]} adapters
 */
export default function makeStrategyReader(adapters = {}) {
    return function strategyReader(file) {
        const ext = path.extname(file.path).substring(1)

        return new Promise((resolve, reject) => {
            if (!adapters[ext]) {
                reject(new Error(file.path + ': adapter not found for file ext ' + ext))
            } else {
                return resolve(adapters[ext](file))
            }
        })
    }
}
