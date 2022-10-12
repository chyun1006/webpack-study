const { resolve } = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // useBuiltIns:动态 polyfill，根据 target.browsers 将部分 polyfill 按需加载进来
              presets: [['@babel/preset-env', { useBuiltIns: 'usage' }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    usedExports: true,
    minimize: false, // 告诉webpacK 使用terser等研所插件压缩代码
    minimizer: [], // 使用一个定制过的 terserPlugin 覆盖默认选项
    runtimeChunk: true, // 提取webpack 的运行时代码为单独一个chunk
  },
}
