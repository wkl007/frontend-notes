const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new CleanWebpackPlugin(),
]

const files = fs.readdirSync(resolve('./dll'))

files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: resolve(`./dll/${file}`)
      }),
    )
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: resolve(`./dll/${file}`)
      })
    )
  }
})

module.exports = {
  entry: {
    // lodash: resolve('./src/lodash.js'),
    main: resolve('./src/index.js'),
  },
  output: {
    path: resolve('./dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            //大小限制
            limit: 10240
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
    ]
  },
  plugins,
  optimization: {
    //解决老版本webpack打包contenthash始终变化的问题
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true,
    splitChunks: {
      // 配置所选的代码 "initial"同步代码 "async" 异步代码 "all"所有代码
      chunks: 'all',
      // 代码分割的最小大小 30kb
      minSize: 30000,
      // 代码分割的最大大小 50kb
      // maxSize: 50000,
      // 拆分前共享模块的最小次数
      minChunks: 1,
      // 入口点处的最大并行请求数
      maxAsyncRequests: 5,
      // 按需加载时的最大并行请求数
      maxInitialRequests: 3,
      // 默认情况下，webpack将使用原点和块名称生成名称，如vendors~main.js
      automaticNameDelimiter: '~',
      // 根据块和缓存组键自动选择名称，否则可以传递字符串或函数。
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 当模块完全匹配时，该选项允许重用现有块而不是创建新块。
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
  performance: false
}