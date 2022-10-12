const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = "production"
let configs = {
    entry: {
        app: './src/js/app.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                // 使用 MiniCsssExtractPlugin.loader 替换 style-loader
                // 作用：提取js 中的css成单独的文件
                //MiniCsssExtractPlugin.loader,
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                /**
                 * css兼容性处理
                 * 帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                 */
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                ['postcss-preset-env', {}]
                            ]
                        }
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        // css 抽离插件，可以将css从js 中抽离出来，形成单独的样式文件
        new MiniCssExtractPlugin({
            // 对输出的文件重新命名
            filename: 'style/[name].css',
        }),

        // 压缩css代码
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development' //development  production
}

module.exports = configs