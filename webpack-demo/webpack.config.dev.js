const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ConsoleLogOnBuildWebpackPlugin = require("./plugins/ConsoleLogOnBuildWebpackPlugin");
const MyExampleWebpackPlugin = require("./plugins/MyExampleWebpackPlugin");
const FileListPlugin = require("./plugins/FileListPlugin");

module.exports = {
  mode: "development", //模式，默认两种’production‘、’development‘
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.[hash].js", //打包后的文件名
    path: path.resolve(__dirname, "build"), //路径必须是绝对路径
  },
  plugins: [
    //数组、存放所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html", //制定要生成的文件模板
      filename: "index.html", //生成的html文件的名称
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/build.css", //自定义生成的css文件名称
    }),
    new CopyWebpackPlugin([
      {
        from: "test.txt",
      },
    ]),
    new ConsoleLogOnBuildWebpackPlugin({
      options: true,
    }),
    new FileListPlugin(),
    new CleanWebpackPlugin(),
    new MyExampleWebpackPlugin(),
  ],
  devServer: {
    proxy: {
      //配置一个代理，把以 /api 开头的请求路径 全部转发到 http://localhost:3000
      //'/api': 'http://localhost:3000'

      //但是服务器端的api并不是都是以 /api 开头的，这时候怎么办呢,如下：
      //
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "/api": "",
        },
      },
    },
    //hot: true
  },
  module: {
    rules: [
      //rules 下可以有多个loader
      {
        test: /\.css$/,
        //use: 'css-loader' //use下可以使用多个loader

        //use: ['style-loader', 'css-loader']

        //css-loader  解析@import 这种语法
        //style-loader 把css插入到header标签中
        //loader的用法 ，一个是字符串，多个loader需要用数组[]
        //loader的顺序，默认是从右向左执行，从下向上
        //loader 还可以写成对象，可以传递额外的参数
        use: [
          // {
          //     loader: 'style-loader',
          //     options: {
          //         //insert:'top', //希望打包的style标签插入带到header的上面，防止在header中自己写的样式被覆盖
          //         //injectType: 'singletonStyleTag'
          //     }
          // },
          //提取生成的js 文件中的css为单独的文件，默认生成一个main.css
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        //处理less
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              //insert:'top' //希望打包的style标签插入带到header的上面，防止在header中自己写的样式被覆盖
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.md$/,
        //use:['./markdown-loader']
        use: [
          {
            loader: "./markdown-loader.js",
            options: {
              name: "markdown-loader",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "./plugins/svg-loader/svg-loader.js",
            options: {
              target: "esm",
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            // loader: "./plugins/file-loader.js",
            loader: "file-loader",
            options:{
                name: '[path][name].[ext]'
            }
          },
        ],
        // loader: "./plugins/file-loader.js",
      },
    ],
  },
  resolve: {
    // alias: {
    //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // },
    mainFields: ["style", "main"], //决定在 package.json 中使用哪个字段导入模块，默认值为["browser", "module", "main"]
    //extensions:[], //自动解析确认的扩展名，引入模块是可以不带扩展默认 ['.js','.json']
  },

  /**
   * 防止将某些 import 的包打包到bundle中，而是在运行时再去获取这些依赖
   * 比如：从cdn获取的JQuery，而不是把它打包
   *
   */
  externals: {
    jQuery: "jQuery",
  },
};
