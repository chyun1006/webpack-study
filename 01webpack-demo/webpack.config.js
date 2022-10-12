let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let configs = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //小于8k的图片打包时将会被转换为base64,减少网络请求
                        limit: 8 * 1024,
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }]
            },
            //引入字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development', // production  development
}

module.exports = configs