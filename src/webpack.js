import loaderUtils from 'loader-utils'
import glob from './utils/glob'
import yamlScan from './scan/yamlScan'

export default function webpackLoader(mask) {
    this.cacheable && this.cacheable()
    const cb = this.async()
    const options = loaderUtils.parseQuery(this.query)
    const scan = yamlScan(options)
    glob(mask)
        .then(files => {
            files.forEach(file => {
                this.addDependency(file)
            })

            return scan(files)
        })
        .then(data => {
            cb(null, data)
        })
        .catch(cb)
}
