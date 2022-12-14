function FileListPlugin() {}

FileListPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        var filelist = 'In this build:\n\n';
        for (var filename in compilation.assets) {
            filelist += ('- ' + filename + '\n');
        }

        compilation.assets['filelist.md'] = {
            source: function () {
                return filelist;
            },
            size: function () {
                return filelist.length;
            }
        }
        callback()
    })
}

module.exports = FileListPlugin