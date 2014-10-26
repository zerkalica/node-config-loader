#Node config loader

Scan directories and loads json and yaml files.

#Usage
``` yml
# ./config/test.all.yml

console:
  proc: test
  name: test
```

``` yml
# ./config/app1#main.all.yml
app1:
  proc: test-test
```

``` yml
# ./config/test.dev.yml

console:
  proc: test-dev
  name: test
```

./config/example.dev.json
``` json
{
  "example": {
    "proc": "example-dev",
    "name": "test"
  }
}
```

``` javascript
var ConfigLoader = require('node-config-loader');

ConfigLoader({env: 'dev', project: 'app1'})
	.addConfigPath(__dirname + '/config')
	.load(function (config) {
		//do something with config data
	});
```

