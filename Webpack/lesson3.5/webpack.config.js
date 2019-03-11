const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    publicPath: 'https://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
}