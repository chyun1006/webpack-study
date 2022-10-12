let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', //模式，默认两种’production‘、’development‘
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js', //打包后的文件名
        path: path.resolve(__dirname, 'build'), //路径必须是绝对路径
    },
    devServer: { //开发服务器的设置
        port: 3000,
        progress: true,
        contentBase: path.resolve(__dirname, 'build')
    },
    plugins: [ //数组、存放所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',//制定要生成的文件模板
            filename:'index.html',//生成的html文件的名称
            minify:{
                removeAttributeQuotes:true,//移除双引号
                collapseWhitespace:true,//变成一行
            },
            hash:true //加上hash戳
        })
    ]
}