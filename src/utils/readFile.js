// @flow

import fs from 'fs'
import nodePromisify from './nodePromisify'

export default nodePromisify(fs.readFile, fs)
