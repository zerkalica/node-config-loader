import globby from 'globby'

const mask = 'src/**/__tests__/*.js'
const srcMask = __dirname + '/../' + mask
//console.log(srcMask)
globby.sync(srcMask).forEach(file => require(file))
