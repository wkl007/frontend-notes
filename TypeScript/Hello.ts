export class Hello {
  static test () {
    console.log(222)
  }
}

function test (template, name, age) {
  console.log(template)
  console.log(name)
  console.log(age)
}

let myname = 'wkl'

let getAge = function () {
  return 18
}

test`hello my name is ${myname}, I'm ${getAge()}`

let isDone: boolean = false

let decLiteral: number = 6

let name: string = 'bob'

let list: number[] = [1, 2, 3]

let list2: Array<number> = [1, 2, 3]

function defaultValue (a: string, b?: string, c: string = 'wkl') {
  console.log(a, b, c)
}

defaultValue('a')

function func1 (...args) {
  args.forEach(i => {
    console.log(i)
  })
}

function func2 (a, b, c) {
  console.log(a, b, c)
}

var args = [1, 2]
// @ts-ignore
func2(...args)

function * doSomething () {
  console.log('start')
  yield
  console.log('finish')
}

let do1 = doSomething()

// @ts-ignore
do1.next()
// @ts-ignore
do1.next()

function getStock () {
  return {
    code: 'IBM',
    price: {
      price1: 200,
      price2: 100
    },
    aaa: 1,
    bbb: 2
  }
}

let { code, price, price: { price1, price2 } } = getStock()

let arr = [1, 2, 3, 4]

// let [number1, number2] = arr
// let [, , number1, number2] = arr//3 4
// let [number1, , , number2] = arr//1 4
let [number1, number2, ...others] = arr//1 2 3 4

function test1 ([number1, number2, ...others]) {
  console.log(number1, number2, others)
}

// @ts-ignore
test1(arr)

let sum = (arg1, arg2) => arg1 + arg2

let myArray = [1, 2, 3, 4, 5]

console.log(myArray.filter(value => value % 2 === 0))

let arr1 = [1, 2, 3, 4]

arr1.forEach(i => console.log(i))

for (let i in arr1) {
  console.log(arr1[i])
}

for (let i of arr1) {
  if (i > 2) break
  console.log(i)
}

class Person {
  constructor (public name: string, public age: number) {
  }

  eat () {
    console.log(`${this.name},I am eating`)
  }
}

class Child extends Person {
  constructor (name: string, code: number) {
    super(name, code)
    this.code = code
  }

  code: number

  work () {
    super.eat()
    console.log(`I am working`)
  }
}

let p1 = new Person('wkl', 12)
p1.eat()

let p2 = new Person('wkl2', 20)
p2.eat()

let c1 = new Child('wkl3', 22)
c1.eat()
c1.work()

let workers: Array<Person> = []
workers[0] = new Person('张三', 21)
workers[1] = new Person('李四', 21)

interface IPerson {
  name: string,
  age: number
}

class Person2 {
  constructor (public config: IPerson) {
  }
}

let person = new Person2({ name: '张三', age: 12 })

interface Animal {
  eat ()
}

class Sheep implements Animal {
  eat () {
    console.log('I am eating')
  }
}

class Tiger implements Animal {
  eat () {
    console.log('I am eating')
  }
}

