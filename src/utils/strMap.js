export default function strMap(strs, templateArgs) {
    return Object.keys(templateArgs).reduce((str, key) =>
        str.replace(new RegExp('{' + key + '}', 'g'), templateArgs[key]), strs
    )
}
