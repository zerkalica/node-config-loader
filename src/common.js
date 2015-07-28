import polyScan from './scan/polyScan'
import glob from './utils/glob'

export default function makeCommonMerger(mask, options) {
    const scan = polyScan(options)

    return function commonMerger(mask) {
        return glob(mask, {nodir: true})
            .then(scan)
    }
}
