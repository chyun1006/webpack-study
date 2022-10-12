const merge = require('webpack-merge')
const path = require('path')

const dev = require('./webpack.dev.js')
const prod = require('./webpack.prod.js')
//const env = process.env.NODE_ENV
const TARGET = process.env.npm_lifecycle_event

let HtmlWebpackPlugin = require('html-webpack-plugin')

const common = {
    entry: {
        app: './src/views/app.js',
        home:'./src/views/home/home.js',
        about:'./src/views/about/about.js'
    },
    //devtool: 'source-map',
    output: {
        filename: '[name].[hash].js', //打包后的文件名
        path: __dirname+'/dist/src/views' //路径必须是绝对路径
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'app',
            filename: 'src/views/app.html',
            template: './src/views/app.html'
        }),
        new HtmlWebpackPlugin({
            title: 'home',
            filename: 'src/views/home/home.html',
            template: './src/views/home/home.html'
        }),
        new HtmlWebpackPlugin({
            title: 'about',
            filename: 'src/views/about/about.html',
            template: './src/views/about/about.html'
        })
    ]
}

if (TARGET == "dev") {
    module.exports = merge(common, dev)
}

if (TARGET == "build") {
    module.exports = merge(common, prod)
}