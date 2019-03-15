/*import _ from 'lodash'

console.log(_.join(['a', 'b', 'c'], 'xxxx'))*/

/*function getComponent () {
  return import(/!* webpackChunkName:"lodash" *!/'lodash').then(_ => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['a', 'b', 'c'], '$$$')
    return element
  })
}

getComponent().then(res => {
  document.body.appendChild(res)
})*/

import _ from 'lodash'

var element = document.createElement('div')
element.innerHTML = _.join(['a', 'b', 'c'], '$$$')

document.body.appendChild(element)

import test from './test'
import jquery from 'jquery'

console.log(test.name)