import getFiles from './common/getFiles'
import scan from './common/scan'

export default function loadConfig(opts) {
    return getFiles(opts)
        .then(scan)
}
