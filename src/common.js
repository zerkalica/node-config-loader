import polyScan from './scan/polyScan'
import glob from './utils/glob'

export default function makeCommonMerger(options) {
    const scan = polyScan(options)

    return function commonMerger(mask, globOptions = {}) {
        const opts = {
            ...globOptions,
            nodir: true
        }

        return glob(mask, opts)
            .then(scan)
    }
}
