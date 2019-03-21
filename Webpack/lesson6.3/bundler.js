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
