let fs = require('fs')
let path = 'src/views'
let HtmlWebpackPlugin = require('html-webpack-plugin')
const getHtmlPages = function (path) {
    let pages = []
    let paths = fs.readdirSync(path)
    paths.forEach(file => {
        let filePath = path + '/' + file
        fs.stat(filePath, (err, stats) => {
            if (stats.isDirectory()) {
                getHtmlPages(filePath)
            } else {
                pages.push(new HtmlWebpackPlugin({
                    title: 'app',
                    filename: filePath,
                    template: '.' + filePath,
                }))
            }
        })
    })
    return pages
}

console.log(getHtmlPages(path))