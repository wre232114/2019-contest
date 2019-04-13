const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'pushbox.bundle.js'
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /(\.png)|(\.jpg)|(\.gif)$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html',title:'推箱子小游戏'}),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to:'./assets'
    }])
  ],
  optimization: {
    minimize: true
  }
}

module.exports = config;