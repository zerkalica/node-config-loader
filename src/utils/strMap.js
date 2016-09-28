// @flow

export default function strMap(strs: string, templateArgs: {[id: string]: string}): string {
    return Object.keys(templateArgs).reduce((str, key) =>
        str.replace(new RegExp('{' + key + '}', 'g'), templateArgs[key]), strs
    )
}
