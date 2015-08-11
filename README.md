# Node config loader

Scan directories, load, parse to js object and merge many configs into single file/object.

## Features
* Highly customizable and composable: each component is a pure function and exposed to public: compose you own loaders
* Used [globby](https://github.com/sindresorhus/globby) for files matching
* Used promises via [babel-runtime](https://babeljs.io/docs/usage/runtime/)
* Compatible with [lorenwest node-config](https://github.com/lorenwest/node-config/wiki/Configuration-Files) file loading scheme, but each file name can be prefixed by '#' separator
* Default loader supports json and yml files via [nodeca js-yaml](https://github.com/nodeca/js-yaml) (can be overrided)

## Usage

### As common lib

```js
//simple.js
import loader from 'node-config-loader'
import os from 'os'

loader({
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
})(__dirname + '/config/**/*.{json,yml,tml}', {nodir: true})
.then(config => console.log(config))
.catch(err => config.error(err.message))
```


```js
//complex.js

import jsYaml from 'js-yaml'
import os from 'os'

import globby from 'node-config-loader/utils/globby'

import merge from 'node-config-loader/utils/merge'
import scanner from 'node-config-loader/utils/scanner'

import strategyReader from 'node-config-loader/readers/strategyReader'
import yamlReader from 'node-config-loader/readers/yamlReader'
import requireReader from 'node-config-loader/readers/requireReader'

import nodeFilter from 'node-config-loader/filters/nodeFilter'

function MyScan({
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
}) {
    return scanner({
        filter: nodeFilter({
            instance,
            env,
            hostname,
            tagSeparator
        }),
        readFile: strategyReader({
            'yml': yamlReader(jsYaml),
            'json': requireReader()
        }),
        merge
    })
}

globby([__dirname + '/config/**/*.{json,yml,tml}'])
  .then(MyScan({}))
  .then(config => console.log(config))
```

### As webpack loader

Config load order:

1. .configloaderrc
2. webpack.config.js configLoader section
3. webpack loader query params

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

* {ROOT} - project root
* {DIRNAME} - .configloaderrc directory
* {PWD} - process.cwd()
* any process.env variable

### Settings in Webpack config

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
