import loaderUtils from 'loader-utils'
import path from 'path'
import __debug from 'debug'
import fr from 'find-root'

import strMap from './utils/strMap'
import getFiles from './common/getFiles'
import scan from './common/scan'

const debug = __debug('node-config-loader:webpackLoader:debug')

export default function webpackLoader(source) {
    if (this.cacheable) {
        this.cacheable()
    }
    const rp = path.dirname(this.resourcePath)
    const cb = this.async()
    const params = JSON.parse(source)
    const query = loaderUtils.parseQuery(this.query) || {}
    const opts = {
        nodir: true,
        ...params,
        ...query,
        ...this.options.configLoader || {}
    }

    const templateArgs = {
        ...process.env,
        ROOT: fr(rp),
        DIRNAME: rp,
        PWD: process.cwd()
    }

    opts.mask = opts.mask.map(mask => strMap(mask, templateArgs))
    debug('%o', opts)

    if (!cb) {
        throw new Error('node-config-loader can\'t support sync mode')
    }

    getFiles(opts)
        .then(files => {
            files.forEach(file => this.addDependency(file))
            return scan(files)
        })
        .then(value => {
            this.value = [value]
            cb(null, 'module.exports = ' + JSON.stringify(value, undefined, '\t') + ';')
        })
        .catch(err => cb(err))
}
