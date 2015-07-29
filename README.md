# Node config loader

Scan directories, load, parse to js object and merge many configs into single file/object.

## Features
* Highly customizable and composable: each component is a pure function and exposed to public: compose you own loaders
* Used [isaacs node-glob](https://github.com/isaacs/node-glob) for files matching
* Used promises via [babel-runtime](https://babeljs.io/docs/usage/runtime/)
* Compatible with [lorenwest node-config](https://github.com/lorenwest/node-config/wiki/Configuration-Files) file loading scheme, but each file name can be prefixed by '#' separator
* Default loader supports json and yml files via [nodeca js-yaml](https://github.com/nodeca/js-yaml) (can be overrided)

## Usage

### As common lib

```js
//simple.js
import loader from 'node-config-loader'
import os from 'os'

loader(__dirname + '/config/**/*.{json,yml,tml}', {
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
})
.then(config => console.log(config))
.catch(err => config.error(err.message))
```


```js
//complex.js

import jsYaml from 'js-yaml'
import os from 'os'

import glob from 'node-config-loader/utils/glob'

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

glob(__dirname + '/config/**/*.{json,yml,tml}')
  .then(MyScan())
  .then(config => console.log(config))
```

### As webpack loader
```js
import config from 'node-config-loader/webpack!./config/**/*.yml'
console.log(config)
```
