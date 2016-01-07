import globby from 'globby'
import nodeFilter from '../filters/nodeFilter'

export default function getFiles(opts = {}) {
    const {instance, env, hostname, tagSeparator} = opts

    return globby(opts.mask, {...opts, nodir: true})
        .then(nodeFilter({instance, env, hostname, tagSeparator}))
}
