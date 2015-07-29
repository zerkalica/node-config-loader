import polyScan from './scan/polyScan'
import globby from './utils/globby'

export default function makeCommonMerger(options) {
    const scan = polyScan(options || {})

    return function commonMerger(mask, globbyOptions) {
        globbyOptions = globbyOptions || {}
        const opts = {
            ...globbyOptions,
            nodir: true
        }

        return globby(mask, opts)
            .then(scan)
    }
}
