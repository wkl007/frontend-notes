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
