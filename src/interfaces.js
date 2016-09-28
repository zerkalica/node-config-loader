// @flow

export interface FileRec {
    contents: Buffer;
    path: string;
}

export type Parser = (file: FileRec) => Object
