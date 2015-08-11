import loaderUtils from 'loader-utils'
import globby from './utils/globby'
import polyScan from './scan/polyScan'
import strMap from './utils/strMap'
import path from 'path'
import __debug from 'debug'
import fr from 'find-root'
const debug = __debug('node-config-loader:webpackLoader:debug')

export default function webpackLoader(source) {
    this.cacheable && this.cacheable()
    const cb = this.async()
    const params = JSON.parse(source)
    const query = loaderUtils.parseQuery(this.query) || {}
    console.log(111, this.query)
    const opts = {
        nodir: true,
        ...params,
        ...query,
        ...this.options.configLoader || {}
    }

    const scan = polyScan(opts)
    const templateArgs = {
        ...process.env,
        'ROOT': fr(path.dirname(this.resourcePath)),
        'PWD': process.cwd()
    }

    const masks = opts.mask.map(mask => strMap(mask, templateArgs))
    debug('globby(%o, %o)', masks, opts)

    delete opts.mask
    delete opts.instance
    delete opts.env
    delete opts.hostname
    delete opts.tagSeparator

    if (!cb) {
        throw new Error('node-config-loader can\'t support sync mode')
    }

    globby(masks, opts)
        .then(files => {
            files.forEach(file => this.addDependency(file))
            return scan(files)
        })
        .then(value => {
            cb(null, JSON.stringify(value, undefined, '\t'))
        })
        .catch(err => cb(err))
}
