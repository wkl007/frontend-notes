//boolean
let isDone: boolean = false

//number
let decLiteral: number = 20
let hexLiteral: number = 0x14 //十六进制
let binaryLiteral: number = 0b10100 //二进制
let octalLiteral: number = 0o24 //八进制

//string
let myName: string = 'bob'
myName = 'smith'

//array
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

//tuple 表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number]
x = ['hello', 10] // OK

//enum 对 JavaScript 标准数据类型的一个补充
enum Color {Red, Green, Blue}

let c: Color = Color.Green

//any 那些在编程阶段还不清楚类型的变量指定一个类型
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean

//void void 类型像是与 any 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
function warnUser (): void {
  console.log('This is my warning message')
}

//null和undefined
let u: undefined = undefined
let n: null = null

//never 那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error (message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail () {
  return error('Something failed')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop (): never {
  while (true) {
  }
}

// object
declare function create (o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

//类型断言
//尖括号
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
//as
let someValue2: any = 'this is a string'

let strLength2: number = (someValue2 as string).length



