console.log('hello world')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(res => {
        console.log('service worker 注册成功')
      })
      .catch(err => {
        console.log('service worker 注册失败')
      })
  })
}