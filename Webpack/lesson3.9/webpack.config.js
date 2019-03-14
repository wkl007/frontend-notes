const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: '8090',
    hot: true,//HMR
    hotOnly: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            //大小限制
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      },
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
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}