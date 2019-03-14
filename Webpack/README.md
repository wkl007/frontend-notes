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



#### 4.2 Development和Production模式的区分打包

#### 4.3 Webpack和Code splitting

#### 4.4 SplitChunksPlugin 配置参数详解

#### 4.5 Lazy Loading 懒加载，Chunk 是什么？

#### 4.6 打包分析，Preloading，Prefetching

#### 4.7 Css 文件的代码分割

#### 4.8 Webpack与浏览器缓存

#### 4.9 Shimming 的作用

#### 4.10 环境变量的使用方法

### 5. Webpack 实战配置案例讲解

#### 5.1 Library 的打包

#### 5.2 PWA 的打包配置

#### 5.3 TypeScript 的打包配置

#### 5.4 使用WebpackDevServer 实现请求转发

#### 5.5 WebpackDevServer 解决单页面应用路由问题

#### 5.6 EsLint 在 Webpack 中的配置

#### 5.7 Webpack 性能优化

#### 5.8 多页面打包配置

### 6. Webpack 底层原理及脚手架工具分析

#### 6.1 如何编写一个Loader

#### 6.2 如何编写一个Plugin

#### 6.3 Bundler 源码编写

### 7. Create-React-App 和 Vue-Cli 3.0 脚手架工具配置分析

#### 7.1 Create-React-App

#### 7.2 Vue-Cli 3.0
