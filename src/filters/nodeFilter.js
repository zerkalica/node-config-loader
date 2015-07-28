import path from 'path'
import os from 'os'
import strMap from '../utils/strMap'

export const defaultTemplates = [
    'default',
    'default-{instance}',
    '{deployment}',
    '{deployment}-{instance}',
    '{hostname}',
    '{hostname}-{instance}',
    '{hostname}-{deployment}',
    '{hostname}-{deployment}-{instance}',
    'local',
    'local-{instance}',
    'local-{deployment}',
    'local-{deployment}-{instance}'
]

function subStrFrom(str, fromStr) {
    return str.substring(str.indexOf(fromStr) + 1)
}

export default function makeNodeFilter({
    instance = 'main',
    hostname = os.hostname(),
    tagSeparator = '#',
    env = process.env.NODE_ENV,
    templates = defaultTemplates
}) {
    const filesTemplates = templates.map(template => strMap(template, {
        hostname,
        deployment: env,
        instance
    }))

    return function nodeFilter(relFile) {
        const filePart = subStrFrom(path.basename(relFile, path.extname(relFile)), tagSeparator)
        return filesTemplates.filter(file => filePart === file).length > 0
    }
}
