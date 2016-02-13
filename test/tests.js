import globby from 'globby'

const mask = 'src/**/__tests__/*.js'
const srcMask = __dirname + '/../' + mask

globby.sync(srcMask).forEach(file => require(file))
