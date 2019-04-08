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

const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

function MyPromise (fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectCallbacks = []

  // resolve 函数 Promise内部调用 resolve 函数 例:new MyPromise((resolve,reject)=>{resolve(1)})
  function resolve (value) {
    if (that.state === PENDING) {
      that.state = RESOLVE
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  // reject 函数 Promise内部调用的 reject 函数 例:new MyPromise((resolve,reject)=>{reject(1)})
  function reject (value) {
    if (that.state === PENDING) {
      that.state = REJECT
      that.value = value
      that.rejectCallbacks.map(cb => cb(that.value))
    }
  }

  // 调用传入 MyPromise 内的方法 例:new MyPromise((resolve,reject)=>{})   fn=(resolve,reject)=>{}
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// 在原型上添加then方法
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  // 判断传入的是否为函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r}

  //如果 Promise 内部存在异步代码，调用then方法时，此时 promise 内部还是 PENDING 状态，将 then 里面的函数添加进回调数组，当异步处理完成后调用 MyPromise 内部的 resolve 或者 reject 函数
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectCallbacks.push(onRejected)
  }
  if (that.state === RESOLVE) {
    onFulfilled(that.value)
  }
  if (that.state === REJECT) {
    onRejected(that.value)
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(res => {
  console.log(res)
}, err => {})

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F () {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

function myInstanceof (left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined) return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}