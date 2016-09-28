// @flow

import globby from 'globby'
import createNodeFilter from '../core/createNodeFilter'
import type {CreateNodeFilterOpts} from '../core/createNodeFilter'

export interface GetFilesOptions extends CreateNodeFilterOpts {
    mask: string[];
    glob?: {
        cwd?: string;
        root?: string;
        dot?: string;
        nomount?: boolean;
        mark?: boolean;
        nosort?: boolean;
        stat?: boolean;
        readdir?: boolean;
        silent?: boolean;
        statCache?: Object;
        symlinks?: Object;
        debug?: boolean;
        nonull?: boolean;
        nounique?: boolean;
        nobrace?: boolean;
        noglobstar?: boolean;
        noext?: boolean;
        nocase?: boolean;
        matchBase?: boolean;
        nodir?: boolean;
        ignore?: string;
        follow?: boolean;
        realpath?: boolean;
        absolute?: boolean;
    }
}

export default function getFiles(opts: GetFilesOptions): Promise<string[]> {
    return globby(opts.mask, {nodir: true, ...opts.glob})
        .then(createNodeFilter(opts))
}
