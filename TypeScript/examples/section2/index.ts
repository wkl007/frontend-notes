function f () {
  var a = 10
  return function g () {
    var b = a + 1
    return b
  }
}

var g = f()
g()

let a = {
  item: {
    name: 222
  }
}
const { item } = a

item.name = 333


