function MyExampleWebpackPlugin(options) {

}

MyExampleWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compilation,callback) => {
        console.log('This is an example plugin!!!')
        //console.log(compilation.assets)
        for (const asset in compilation.assets) {
            //console.log('----',asset)
        }

        
        compilation.chunks.forEach(chunk => {
            //console.log('----chunk',chunk)
            chunk.files.forEach(file=>{
                //console.log('----file---',file)
                //console.log(compilation.assets[file].source())
            })
        });

        callback()
    })
    compiler.hooks.done.tap('MyExampleWebpackPlugin',(stats=>{
        console.log('This is an example plugin!!! === 222')
    }))

   
}

module.exports = MyExampleWebpackPlugin