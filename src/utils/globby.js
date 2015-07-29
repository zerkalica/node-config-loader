import globby from 'globby'
import nodePromisify from './nodePromisify'

export default nodePromisify(globby)
