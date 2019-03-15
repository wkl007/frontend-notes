document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */'./click.js').then(res => {
    res()
  }).catch(err => {})
})
