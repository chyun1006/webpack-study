let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development', //模式，默认两种’production‘、’development‘
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js', //打包后的文件名
        path: path.resolve(__dirname, 'build'), //路径必须是绝对路径
    },
    plugins: [ //数组、存放所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', //制定要生成的文件模板
            filename: 'index.html', //生成的html文件的名称
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        proxy: {
            //配置一个代理，把以 /api 开头的请求路径 全部转发到 http://localhost:3000
            //'/api': 'http://localhost:3000' 

            //但是服务器端的api并不是都是以 /api 开头的，这时候怎么办呢,如下：
            //
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
    module: {
        rules: [ //rules 下可以有多个loader
            {
                test: /\.css$/,
                //use: 'css-loader' //use下可以使用多个loader

                //use: ['style-loader', 'css-loader']

                //css-loader  解析@import 这种语法
                //style-loader 把css插入到header标签中
                //loader的用法 ，一个是字符串，多个loader需要用数组[]
                //loader的顺序，默认是从右向左执行，从下向上
                //loader 还可以写成对象，可以传递额外的参数
                use: [{
                        loader: 'style-loader',
                        options: {
                            //insert:'top', //希望打包的style标签插入带到header的上面，防止在header中自己写的样式被覆盖
                            //injectType: 'singletonStyleTag'
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                //处理less
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        //insert:'top' //希望打包的style标签插入带到header的上面，防止在header中自己写的样式被覆盖
                    }
                }, 'css-loader', 'less-loader']
            }
        ]
    }
}