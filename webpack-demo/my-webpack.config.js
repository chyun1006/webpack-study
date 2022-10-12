let webpack = require("webpack");
let path = require("path");
let fs = require("fs");

const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", //打包后的文件名
    path: path.resolve(__dirname, "dist"), //路径必须是绝对路径
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: "./file-loader.js",
      },
    ],
  },
};

let compiler = webpack(config);
compiler.run((err, stats) => {
  console.log("===========", err, stats);
});
