//npm install --save vinyl-fs toml js-aml node-config-loader
// examples/example1.js
var fs = require('vinyl-fs');
var Toml = require('toml');
var JsYaml = require('js-yaml');

var ConfigLoader = require('..');
var Adapter = ConfigLoader.Adapter;

fs.src([__dirname + '/../tests/config/*.{toml,yaml}'])
  .pipe(ConfigLoader.mergeStream({
    env: 'dev',
    target: 'client',
    fileName: 'config-all.json',
    parser: Adapter.strategy({
        yml: Adapter.yaml(JsYaml),
        yaml: Adapter.yaml(JsYaml),
        toml: Adapter.toml(Toml)
    })
  }))
  .on('data', success);

function success(file) {
  console.log('done:', JSON.stringify(file.mergedData, null, '    '));
}
