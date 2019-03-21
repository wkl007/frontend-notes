[TOC]

## 《从基础到实战 手把手带你掌握新版Webpack4.0》学习笔记

- 课程介绍
- 初识Webpack
- Webpack核心概念
- Webpack进阶
- Webpack实战配置案例
- Webpack底层原理及脚手架工具分析

### 1.  课程介绍

#### 1.1 课程收获

彻底学会Webpack的配置

理解Webpack的作用及原理

上手项目的打包配置过程

拥有工程化的前端思维

步入高级前端工程师行列

### 2. 初识Webpack

#### 2.1 Webpack究竟是什么？

#### 2.2 什么是模块打包工具

#### 2.3 Webpack的正确使用方式

#### 2.4 使用Webpack的配置文件

```javascript
//使webpack自定义配置打包
npx webpack --config webpackconfig.js
```

#### 2.5 浅析Webpack打包输入内容

### 3. Webpack核心概念

#### 3.1 什么是loader

> loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！

```javascript
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

#### 3.2 使用loader打包静态资源

`file-loader`使用

> 处理非js文件

```javascript
module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            // placeholder 占位符
            name: '[name]_[hash].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  }
```

`url-loader`使用

> Loads files as `base64` encoded URL

```javascript
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
      }
    ]
  }
```

`css-loader`使用

> `css-loader` 解释(interpret) `@import` 和 `url()` ，会 `import/require()` 后再解析(resolve)它们。
>
> 引用资源的合适 loader 是 [file-loader](https://www.webpackjs.com/loaders/file-loader/)和 [url-loader](https://www.webpackjs.com/loaders/url-loader/)，你应该在配置中指定（查看[如下设置](https://github.com/webpack-contrib/css-loader#assets)）。

`style-loader`使用

> Adds CSS to the DOM by injecting a `<style>` tag

```javascript
 {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
}
```

`sass-loader` `less-loader` `stylus-loader` 

> 处理`sass`、`less`、`stylus`文件

loader的执行顺序是从下到上，从右到左

`postcss-loader`使用

> 使用[PostCSS](http://webpack.js.org/)处理CSS的[webpack的](http://postcss.org/)加载器

`autoprefixer`使用

> 添加css3前缀

`css modules`使用

```javascript
{
    loader: 'css-loader',
    options: {
        importLoaders: 2,//在 css-loader 前应用的 loader 的数量
         modules: true
    }
},
```

打包字体文件

```javascript
{
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
},
```

#### 3.3 使用plugins让打包更便捷

> plugin可以在webpack运行到某个时刻的时候，帮你做一些事情

`html-webpack-plugin`的使用

> [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用[lodash模板](https://lodash.com/docs#template)提供你自己的模板，或使用你自己的[loader](https://www.webpackjs.com/loaders)。
>
> 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中

```javascript
plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
```

`clean-webpack-plugin`的使用

> 清空打包目录

#### 3.4 Entry与Output的基础配置

多个入口起点

```javascript
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
```

使用CDN和资源hash的例子

```
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

#### 3.5 SourceMap的配置

> 它是一个映射关系，快速定位代码问题

```javascript
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
      
  mode: 'production',
  devtool: 'cheap-module-source-map',
```

#### 3.6 使用WebpackDevServer 提升开发效率

监听文件变化

1. watch方法

```javascript
"build": "webpack --watch"
```

2. webpack-dev-server

```javascript
  devServer: {
    contentBase: './dist'
  },
```

3. express

```
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')

const complier = webpack(config)

const app = express()

app.use(webpackDevMiddleware(complier, {}))

app.listen(3000, () => {
  console.log('server is running')
})
```

#### 3.7 Hot Module Replacement 热模块更新

> 模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。本页面重点介绍**实现**，而[概念页面](https://www.webpackjs.com/concepts/hot-module-replacement)提供了更多关于它的工作原理以及为什么它有用的细节。

```javascript
const webpack = require('webpack')

devServer: {
    contentBase: './dist',
    open: true,
    port: '8090',
    hot: true,//HMR
    hotOnly: true,
},
plugins: [
    ...
    new webpack.HotModuleReplacementPlugin()
]
  
```

#### 3.8 使用Babel处理ES6语法

安装

```sh
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill @babel/runtime @babel/plugin-transform-runtime
```

配置

```js
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

In order to enable the preset you have to define it in your `.babelrc` file, like this:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        },
        "useBuiltIns": "usage"//减少代码体积
      }
    ]
  ]
}
```

presets执行顺序：从下到上，从右到做

#### 3.9 Webpack实现对React框架代码的打包

### 4. Webpack高级概念

#### 4.1 Tree Shaking 概念详解

> *tree shaking* 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的[静态结构特性](http://exploringjs.com/es6/ch_modules.html#static-module-structure)，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是兴起于 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup)。
>
> 新的 webpack 4 正式版本，扩展了这个检测能力，通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

webpack.config.js

```javascript
  optimization: {
    usedExports: true
  }
```

> 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

package.json

```
{
  "name": "your-project",
  "sideEffects": false
}
```

#### 4.2 Development和Production模式的区分打包

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
| production  | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |

#### 4.3 Webpack和Code splitting

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。 
- 防止重复：使用 [SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/)去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

##### 4.3.1 入口起点

```javascript
  entry: {
    lodash: resolve('./src/lodash.js'),
    main: resolve('./src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve('./dist')
  },  
```

##### 4.3.2 防止重复

```javascript
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }   
```

##### 4.3.3 动态导入

```javascript
function getComponent () {
  return import('lodash').then(_ => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['a', 'b', 'c'], '$$$')
    return element
  })
}

getComponent().then(res => {
  document.body.appendChild(res)
})
```

#### 4.4 SplitChunksPlugin 配置参数详解

```javascript
yarn add --dev @babel/plugin-syntax-dynamic-import
```

```javascript
optimization: {
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
          filename: 'vendors.js'
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
}
```

#### 4.5 Lazy Loading 懒加载，Chunk 是什么？

懒加载 `import`异步加载 `js`

打包生成的每一个js文件就是一个Chunk

#### 4.6 打包分析，Preloading，Prefetching

如果我们以分离代码作为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。[官方分析工具](https://github.com/webpack/analyse) 是一个好的初始选择。下面是一些社区支持(community-supported)的可选工具：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

webpack 4.6.0+增加了对预取和预加载的支持。

在声明导入时使用这些内联指令允许webpack输出“Resource Hint”，它告诉浏览器：

- preloading：当前导航期间可能需要资源    立马想要的资源
- prefetching：将来某些导航可能需要资源   暂时不需要的资源

> 小技巧：chorme浏览器 `ctrl+shitf+p` `coverage`分析代码使用率

#### 4.7 Css 文件的代码分割

```javascript
  output: {
    filename: '[name].js',//此选项决定了每个输出 bundle 的名称。
    chunkFilename: '[name].chunk.js',//此选项决定了非入口(non-entry) chunk 文件的名称。
    path: resolve('./dist')
  },
```

`mini-css-extract-plugin` 插件的使用

只能使用在线上环境，暂不支持HMR

```javascript
yarn add --dev mini-css-extract-plugin optimize-css-assets-webpack-plugin
```

webpack.prod.conf.js

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }  
}
```

#### 4.8 Webpack与浏览器缓存

```javascript
  performance: false//关闭webpack打包警告
```

```javascript
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
```

`contenthash`如果代码有变更，hash值会变化。

#### 4.9 Shimming 的作用

> `webpack` 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 *shimming* 发挥作用的地方。

```javascript
const webpack = require('webpack')

new webpack.ProvidePlugin({
  $: 'jquery',
  _: 'lodash',    
})


export function ui () {
  $('body').css('background', _.join(['orange'], ''))
}
```

#### 4.10 环境变量的使用方法

### 5. Webpack 实战配置案例讲解

#### 5.1 Library 的打包

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'],//配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library',
    libraryTarget: 'umd',//将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量
  }
}
```

#### 5.2 PWA 的打包配置

```javascript
yarn add --dev workbox-webpack-plugin
```

```javascript
const WorkboxPlugin = require('workbox-webpack-plugin')

new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
})
```

#### 5.3 TypeScript 的打包配置

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

#### 5.4 使用WebpackDevServer 实现请求转发

```javascript
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		proxy: {
			'/react/api': {
				target: 'http://www.dell-lee.com',
				secure: false,
				pathRewrite: {
					'header.json': 'demo.json'
				},
				changeOrigin: true,//突破origin限制
				headers: {
					host: 'www.dell-lee.com',
				}
			}
		}
	},
```

#### 5.5 WebpackDevServer 解决单页面应用路由问题

```javascript
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		historyApiFallback: true,//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
	},
```

#### 5.6 EsLint 在 Webpack 中的配置

```javascript
yarn add --dev eslint

npx eslint --init
```

```javascript
devServer: {
	overlay:true,//展示错误弹窗
	contentBase: './dist',
	open: true,
	port: 8080,
	hot: true,
	hotOnly: true,
	historyApiFallback: true,
},
        
{ 
	test: /\.js$/, 
	exclude: /node_modules/,
	use: ['babel-loader', 'eslint-loader']
},
```

```js
module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'rules': {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0
  },
  globals: {
    document: false
  }
}
```

#### 5.7 Webpack 性能优化

##### 5.7.1 跟上技术的迭代(Node,Npm,Yarn)

##### 5.7.2 在尽可能少的模块上应用Loader

##### 5.7.3 Plugin 尽可能精简并确保可靠

##### 5.7.4 resolve 参数合理配置

```javascript
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      child: path.resolve(__dirname, '../src/a/b/c/child')
    }
  },
```

##### 5.7.5 dllPlugin的使用

> 目标：第三方模块只打包一次
>
> 1. 第三方模块打包一次
> 2. 引入第三方模块的时候，要去使用dll文件引入

`webpack.dll.conf.js`配置

```javascript
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
```

`webpack.base.conf.js`配置

```javascript
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
  ...,
  plugins,
  ...
}
```

##### 5.7.6 控制包文件大小

##### 5.7.7 thread-loader,parallel-webpack,happypack 多线程打包

##### 5.7.8 合理使用 sourceMap

##### 5.7.9 结合 stats 分析打包结果

##### 5.7.10 开发环境内存编译

##### 5.7.11 开发环境无用插件剔除

#### 5.8 多页面打包配置

`webpack.base.conf.js`配置

```javascript
...

const makePlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin(),
  ]

  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item]
      }),
    )
  })

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

  return plugins
}

...
```

### 6. Webpack 底层原理及脚手架工具分析

#### 6.1 如何编写一个Loader

`replaceLoader.js` 

```javascript
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // 获取loader中的参数
  console.log(this.query)
  const options = loaderUtils.getOptions(this);
  console.log(options)
    
  return source.replace('小王', '老王')
}
```

`webpack.config.js`

```javascript
module: {
    resolveLoader: {
      modules: ['node_modules', './loaders']
    },
    rules: [
      {
        test: /\.js/,
        use: [
            {
            loader: 'replaceLoader',
            options: {
              name: '小黑'
            }
          },
        ]
      }
    ]
  }
```

#### 6.2 如何编写一个Plugin

`copyright-webpack-plugin.js`

```javascript
class CopyrightWebpackPlugin {
  constructor (options) {
    console.log(options)
  }

  apply (compiler) {
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compiler')
    })

    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
        compilation.assets['copyright.txt'] = {
          source: function () {
            return 'copyright by wkl'
          },
          size: function () {
            return 21
          }
        }
        cb()
      }
    )
  }
}

module.exports = CopyrightWebpackPlugin
```

`webpack.config.js`

```javascript
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
 
plugins: [
    new CopyRightWebpackPlugin()
]
```

#### 6.3 Bundler 源码编写

`bundler.js`

```javascript
const fs = require('fs')//获取文件信息
const path = require('path')//路径处理
const parser = require('@babel/parser')//分析源代码
const traverse = require('@babel/traverse').default//快速找到import节点
const babel = require('@babel/core')//babel核心模块

/**
 * 模块分析
 * @param filename
 * @returns {{filename: *, code, dependencies}}
 */
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8')
  //抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {}
  traverse(ast, {
    ImportDeclaration ({ node }) {
      const dirname = path.dirname(filename)
      dependencies[node.source.value] = './' + path.join(dirname, node.source.value)
    }
  })
  //源码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return {
    filename,
    dependencies,
    code
  }
}

/**
 * 对所有文件进行分析，依赖图谱
 * @param entry
 */
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(
          moduleAnalyser(dependencies[j])
        )
      }
    }
  }
  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

/**
 * 生成代码
 * @param entry
 * @returns {string}
 */
const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  //require函数 exports对象
  return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`
}
const code = generateCode('./src/index.js')

console.log(code)
```

### 7. Create-React-App 和 Vue-Cli 3.0 脚手架工具配置分析

#### 7.1 Create-React-App

#### 7.2 Vue-Cli 3.0
