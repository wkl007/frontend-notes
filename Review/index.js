/**
 * 截流
 * 适合大量事件按时间做平均分配触发
 * @param func
 * @param wait
 * @returns {Function}
 */
export function throttle (func, wait) {
  let lastTime = 0
  return function (...args) {
    let nowTime = +new Date()
    if (nowTime - lastTime > wait) {
      lastTime = nowTime
      func.apply(this, args)
    }
  }
}

/**
 * 防抖
 * 适合多次事件一次响应的情况
 * @param func 用户传入需要防抖的函数
 * @param wait 等待时间
 * @returns {Function}
 */
export function debounce (func, wait) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
