Node config loader [![Build Status](https://secure.travis-ci.org/zerkalica/node-config-loader.png)](http://travis-ci.org/zerkalica/node-config-loader)
======================================================================================================================================================

[![NPM](https://nodei.co/npm/node-config-loader.png?downloads=true&stars=true)](https://nodei.co/npm/node-config-loader/)

Scan directories, load, parse to js object and merge many configs into single file/object.

-	Highly customizable and composable: each component is a pure function and exposed to public: compose you own loaders
-	Used [globby](https://github.com/sindresorhus/globby) for files matching
-	Compatible with [lorenwest node-config](https://github.com/lorenwest/node-config/wiki/Configuration-Files) file loading scheme, but each file name can be prefixed by '#' separator
-	Default loader supports json and yml files via [nodeca js-yaml](https://github.com/nodeca/js-yaml) (can be overrided)
-	Live reload support via webpack loader

## Config merge example

```yaml
# input1#dev.yaml
ns:
    to:
        name: test
testArr:
    - t1
    - t2
__push__: [testArray2]
testArray2:
    - test1
    - test2
```

```yaml
# input2#dev.yaml

ns:
    to:
        email: test-email
testArr:
    - t3
testArray2:
    - test3
```

merged input1 + input2:

```yaml
#output.yaml

ns:
    to:
        name: test
        email: test-email
testArr:
    - t3
testArray2:
    - test1
    - test2
    - test3
```

Usage
=====

As common lib
-------------

```js
//simple.js
import {loadConfig} from 'node-config-loader'
import os from 'os'

loadConfig({
    mask: [
        `${__dirname}/config/**/*.{json,yml,tml}`
        `/etc/myapp.d/**/*.{json,yml,tml}`
        `${process.env.HOME}/.config/myapp/**/*.{json,yml,tml}`
    ],
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
})
    .then(config => console.log(config))
    .catch(err => config.error(err.message))
```

As webpack loader
-----------------

Config load order:

1.	.configloaderrc
2.	webpack.config.js configLoader section
3.	webpack loader query params

```js
import config from 'node-config-loader/webpack?env=prod&instance=client!./.configloaderrc'
console.log(config)
```

Where .configloaderrc is

```json
{
    "mask": [
        "{ROOT}/src/config/**/*.json"
    ],
    "instance": "client|server",
    "env": "prod|dev",
    "hostname" : "host",
    "tagSeparator": "#"
}
```

*mask* is required, all other params are optional.

Available env vars in mask:

-	{ROOT} - project root
-	{DIRNAME} - .configloaderrc directory
-	{PWD} - process.cwd()
-	any process.env variable

Via Webpack config
------------------

```js
// webpack.config.js
module.exports = {
    configLoader: {
        env: args.env || 'dev',
        instance: args.instance || 'client'
    },
    module: {
        loaders: [
            {
                test: /.*\.configloaderrc$/,
                loader: 'node-config-loader/webpack'
            }
    }
}
```

## Flowtype

npm install --save empty

.flowconfig

```ini
[options]
module.name_mapper='.*\(\.configloaderrc\)' -> 'empty/object'
```

Isomorphic friendly сlient with run-time config
-----------------------------------------------

```js
// getConfig.js
import config from '../conf/.configloaderrc'
import {merge} from 'node-config-loader'

function getRuntimeConfig({settings, location, referrer}) {
    return {
        env: {
            origin: location.origin,
            hash: location.hash,
            pathname: location.pathname,
            search: location.search,
            referrer: referrer
        },
        config: {
            debug: settings.debug,
            sitePrefix: settings.sitePrefix,
            locale: {
                lang: settings.locale
            }
        }
    }
}

export default function getConfig(opts) {
    return merge(config, getRuntimeConfig(opts))
}
```

```js
// index.js
import getConfig from './getConfig'

const config = getConfig({
    settings: window.settings || {},
    location: window.location,
    referrer: document.referrer
})

// config
init(config)
```

## interfaces

```js
// @flow

function merge(...objects: Object[]): Object
function strMap(strs: string, templateArgs: {[id: string]: string}): string

interface CreateScannerOpts {
    merge?: (acc: Object, src: Object) => Object;
    parser?: (data: FileRec) => Promise<Object>;
    readFile?: (fileName: string) => Promise<Buffer>;
}

type Scanner = (files: string[]) => Promise<Object>

function createScanner(opts?: CreateScannerOpts): Scanner

interface CreateNodeFilterOpts {
    instance?: string;
    hostname?: string;
    tagSeparator?: string;
    env?: string;
    templates?: string[];
}
function createNodeFilter(opts: CreateNodeFilterOpts): (files: string[]) => string[]

interface GetFilesOptions extends CreateNodeFilterOpts {
    mask: string[];
    glob?: {
        cwd?: string;
        root?: string;
        dot?: string;
        nomount?: boolean;
        mark?: boolean;
        nosort?: boolean;
        stat?: boolean;
        readdir?: boolean;
        silent?: boolean;
        statCache?: Object;
        symlinks?: Object;
        debug?: boolean;
        nonull?: boolean;
        nounique?: boolean;
        nobrace?: boolean;
        noglobstar?: boolean;
        noext?: boolean;
        nocase?: boolean;
        matchBase?: boolean;
        nodir?: boolean;
        ignore?: string;
        follow?: boolean;
        realpath?: boolean;
        absolute?: boolean;
    }
}
function getFiles(opts: GetFilesOptions): Promise<string[]>;

interface LoadConfigOptions extends GetFilesOptions, CreateScannerOpts {
    mask: string[];

    instance?: string;
    hostname?: string;
    tagSeparator?: string;
    env?: string;
    templates?: string[];

    glob?: Object;

    merge?: (acc: Object, src: Object) => Object;
    parser?: (data: FileRec) => Promise<Object>;
    readFile?: (fileName: string) => Promise<Buffer>;
}
function loadConfig(opts: LoadConfigOptions): Promise<Object>
```
