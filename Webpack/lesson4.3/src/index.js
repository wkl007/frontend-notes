/*import _ from 'lodash'

console.log(_.join(['a', 'b', 'c'], 'xxxx'))*/

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
