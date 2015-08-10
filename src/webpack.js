import loaderUtils from 'loader-utils'
import globby from './utils/globby'
import polyScan from './scan/polyScan'
import strMap from './utils/strMap'
import path from 'path'
import fs from 'fs'
import __debug from 'debug'
import fr from 'find-root'
const debug = __debug('node-config-loader:webpackLoader:debug')

export default function webpackLoader() {
    this.cacheable && this.cacheable()
    const cb = this.async()
    const rp = this.resourcePath
    const params = JSON.parse(fs.readFileSync(rp))
    const query = loaderUtils.parseQuery(this.query)
    const opts = {
        ...params,
        ...query,
        nodir: true
    }

    const scan = polyScan(opts)
    const templateArgs = {
        ...process.env,
        'ROOT': fr(path.dirname(rp)),
        'PWD': process.cwd()
    }

    const masks = opts.mask.map(mask => strMap(mask, templateArgs))

    delete opts.masks
    delete opts.instance
    delete opts.env
    delete opts.hostname
    delete opts.tagSeparator

    debug('globby(%o, %o)', masks, opts)

    if (!cb) {
        throw new Error('node-config-loader can\'t support sync mode')
    }

    globby(masks, opts)
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
