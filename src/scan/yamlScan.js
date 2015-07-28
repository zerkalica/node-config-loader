import jsYaml from 'js-yaml'
import os from 'os'

import merge from './utils/merge'
import scanner from './utils/scanner'

import strategyReader from './readers/strategyReader'
import yamlReader from './readers/yamlReader'
import requireReader from './readers/requireReader'

import nodeFilter from './filters/nodeFilter'

export default function yamlScan({
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
}) {
    return scanner({
        filter: nodeFilter({
            instance,
            env,
            hostname,
            tagSeparator
        }),
        readFile: strategyReader({
            'yml': yamlReader(jsYaml),
            'json': requireReader()
        }),
        merge
    })
}
