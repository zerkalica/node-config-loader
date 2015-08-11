import merge from '../utils/merge'
import scanner from '../utils/scanner'
import parser from './parser'

export default scanner({merge, parser})
