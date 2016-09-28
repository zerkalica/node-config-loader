// @flow

import path from 'path'
import os from 'os'
import strMap from '../utils/strMap'

export const defaultTemplates: string[] = [
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

function subStrFrom(str: string, fromStr: string): string {
    return str.substring(str.indexOf(fromStr) + 1)
}

export interface CreateNodeFilterOpts {
    instance?: string;
    hostname?: string;
    tagSeparator?: string;
    env?: string;
    templates?: string[];
}

export default function createNodeFilter({
    instance = 'main',
    hostname = os.hostname(),
    tagSeparator = '#',
    env = process.env.NODE_ENV || 'production',
    templates = defaultTemplates
}: CreateNodeFilterOpts): (files: string[]) => string[] {
    const mapTokens: {[id: string]: string} = {
        hostname,
        deployment: env,
        instance
    }
    const filesTemplates: string[] = templates.map((template: string) => strMap(template, mapTokens))

    function normalize(relFile: string): string {
        return subStrFrom(path.basename(relFile, path.extname(relFile)), tagSeparator)
    }

    return function nodeFilter(relFiles: string[]): string[] {
        return filesTemplates.reduce((acc: string[], template: string) =>
            acc.concat(relFiles.filter((relFile: string) =>
                normalize(relFile) === template)
        ), [])
    }
}
