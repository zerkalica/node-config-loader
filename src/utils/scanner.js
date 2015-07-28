import fsReadFile from './readFile'

export default function makeScanner({filter, merge, readFile}) {
    return function scanner(files) {
        return Promise.resolve(files)
            .then(realFiles => realFiles.filter(filter))
            .then(filteredFiles =>
                Promise.all(filteredFiles.map(fsReadFile))
                    .then(datas => datas.map((contents, i) => 
                        readFile({
                            contents,
                            path: filteredFiles[i]
                        })
                    ))
            )
            .then(objects => objects.reduce((acc, object) => merge(acc, object), {}))
    }
}
