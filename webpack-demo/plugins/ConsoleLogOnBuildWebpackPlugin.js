const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin{
    constructor(){};
    apply(compiler){
        compiler.hooks.run.tap(pluginName,function(compilation){
            //console.log('compile----',compilation)
            console.log("webpack 构建过程开始！");
        })

        compiler.hooks.entryOption.tap(pluginName,function(){
            console.log('===entryOption===')
        })

        compiler.hooks.watchRun.tap(pluginName,function(){
            console.log('===watchRun===')
        })
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin
 