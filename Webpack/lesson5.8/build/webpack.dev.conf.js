const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: '8090',
    hot: true,//HMR
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  output:{
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          //从下到上，从右到左
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,//在 css-loader 前应用的 loader 的数量
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          //从下到上，从右到左
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})