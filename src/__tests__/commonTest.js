import common from '../common'
import assert from 'power-assert'

describe('commonMerger', () => {
    it('should merge server dev environments', () => {
        const testConfig = {
            "example": {
                "proc": "example-dev-yaml",
                "name": "test-yaml",
                "test": {
                    "p2": 444,
                    "p3": 534
                }
            },
            "app1": {
                "arr": [
                    "test1",
                    "test2"
                ],
                "proc": "test-test"
            },
            "console": {
                "proc": "test-dev",
                "name": "test"
            }
        }

        return common({
            instance: 'server',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        })(__dirname + '/config/**/*.*')
        .then(loadedConfig => {
            assert.deepEqual(loadedConfig, testConfig)
        })
    })

    it('should merge client dev environments', () => {
        const testConfig = {
            "example": {
                "proc": "example-dev-yaml",
                "name": "test-yaml",
                "test": {
                    "p2": 444,
                    "p3": 534
                }
            },
            "the": {
                "test_string": "You'll hate me after this - #"
            }
        }

        return common({
            instance: 'client',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        })(__dirname + '/config/**/*.*')
        .then(loadedConfig => {
            assert.deepEqual(loadedConfig, testConfig)
        })
    })

})
