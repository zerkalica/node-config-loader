// @flow

import loaderUtils from 'loader-utils'
import path from 'path'
import __debug from 'debug'
import fr from 'find-root'

import strMap from './utils/strMap'
import getFiles from './core/getFiles'
import createScanner from './core/createScanner'
import type {Scanner} from './core/createScanner'

const debug = __debug('node-config-loader:webpackLoader:debug')

const scan: Scanner = createScanner()

function webpackLoader(source: string): void {
    if (this.cacheable) {
        this.cacheable()
    }
    const rp = path.dirname(this.resourcePath)
    const cb = this.async()
    const params = JSON.parse(source)
    const query = loaderUtils.parseQuery(this.query) || {}
    const opts = {
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
        .then((files: string[]) => {
            files.forEach((file: string) => this.addDependency(file))
            return scan(files)
        })
        .then(value => {
            cb(null, 'module.exports = ' + JSON.stringify(value, undefined, '\t') + ';')
        })
        .catch(err => cb(err))
}

module.exports = webpackLoader
