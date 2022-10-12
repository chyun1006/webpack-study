const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let configs = {
  entry: path.join(__dirname, "./src/app.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 使用 MiniCsssExtractPlugin.loader 替换 style-loader
          // 作用：提取js 中的css成单独的文件
          //MiniCsssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      // 对输出的文件重新命名
      filename: "style/[name].css",
    }),
  ],
  mode: "development",
};

module.exports = configs;
