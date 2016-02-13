import webpack from '../webpack'

describe('commonMerger', () => {
    it.skip('should load webpack', (done) => {
        webpack({
            entry: {
                main: __dirname + '/'
            }
        }, () => {
            done()
        })
    })
})
