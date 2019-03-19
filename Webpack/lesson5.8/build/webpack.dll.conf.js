const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  entry: {
    lodash: ['lodash'],
    react: ['react', 'react-dom'],
    jquery: ['jquery']
  },
  output: {
    filename: '[name].dll.js',
    path: resolve('./dll'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('./dll/[name].manifest.json')
    })
  ]
}