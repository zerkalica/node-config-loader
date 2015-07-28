import yamlScan from './scan/yamlScan'
import glob from './utils/glob'

export default function makeCommonMerger(mask, options) {
    const scan = yamlScan(options)

    return function commonMerger(mask) {
        return glob(mask, {nodir: true})
            .then(scan)
    }
}
