const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // 获取loader中的参数
  const options = loaderUtils.getOptions(this)
  console.log(this.query, options)

  const result = source.replace('小王', '老王')

  this.callback(
    null,
    result,
  )
}