Node config loader
==================

Scan directories, load, parse to js object and merge many configs into single file/object.

-	Highly customizable and composable: each component is a pure function and exposed to public: compose you own loaders
-	Used [globby](https://github.com/sindresorhus/globby) for files matching
-	Used promises via [babel-runtime](https://babeljs.io/docs/usage/runtime/)
-	Compatible with [lorenwest node-config](https://github.com/lorenwest/node-config/wiki/Configuration-Files) file loading scheme, but each file name can be prefixed by '#' separator
-	Default loader supports json and yml files via [nodeca js-yaml](https://github.com/nodeca/js-yaml) (can be overrided)

Usage
=====

As common lib
-------------

```js
//simple.js
import loader from 'node-config-loader'
import os from 'os'

loader({
    mask: [__dirname + '/config/**/*.{json,yml,tml}'],
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
