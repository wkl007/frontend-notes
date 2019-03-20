const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // 获取loader中的参数
  const options = loaderUtils.getOptions(this)
  const callback = this.async()

  setTimeout(() => {
    const result = source.replace('小王', '老王')
    callback(null, result)
  }, 1000)
}