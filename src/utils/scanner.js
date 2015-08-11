import readFile from './readFile'
import __debug from 'debug'
import path from 'path'
const debug = __debug('node-config-loader:scanner:debug')

function basename(p) {
    return path.basename(p)
}

export default function makeScanner({merge, parser}) {
    return function scanner(files) {
        return Promise.resolve(files)
            .then(filteredFiles => {
                debug('filtered: %o', filteredFiles.map(basename))
                return Promise.all(filteredFiles.map(file => readFile(file)))
                    .then(datas =>
                        Promise.all(datas.map((contents, i) =>
                            parser({
                                contents,
                                path: filteredFiles[i]
                            })
                        ))
                    )
            })
            .then(objects =>
                objects.reduce((acc, object) => merge(acc, object), {})
            )
    }
}
