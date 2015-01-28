var expect = require('./test-helpers').expect;
var fs = require('vinyl-fs');

var Toml = require('toml');
var JsYaml = require('js-yaml');

var ConfigBuilder = require('../');
var Adapter = ConfigBuilder.Adapter;

var fakeData = require('./config-all.json');

function load(success) {
    fs.src([__dirname + '/config/*.{toml,yaml}'])
      .pipe(ConfigBuilder.mergeStream({
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
}

describe('node-config-loader', function () {
    it('should load all and dev environment', function (done) {
        load(function (file) {
            expect(file.mergedData).to.be.deep.equal(fakeData);
            done();
        });
    });
});
