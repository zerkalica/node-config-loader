export default function strMap(str, templateArgs) {
    return Object.keys(templateArgs).reduce((str, key) =>
        str.replace(new RegExp('{' + key + '}', 'g'), templateArgs[key]), str
    )
}
