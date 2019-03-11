const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
        test: /\.scss$/,
        use: [
          //从下到上，从右到左
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,//在 css-loader 前应用的 loader 的数量
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}