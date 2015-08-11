import globby from '../utils/globby'
import nodeFilter from '../filters/nodeFilter'

export default function getFiles(opts) {
    /* eslint-disable no-param-reassign */
    opts = opts || {}
    /* eslint-enable no-param-reassign */
    const {instance, env, hostname, tagSeparator} = opts

    return globby(opts.mask, {...opts, nodir: true})
        .then(nodeFilter({instance, env, hostname, tagSeparator}))
}
