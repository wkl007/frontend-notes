interface LabelledValue {
  label: string
}

function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

//可选属性
interface Square {
  color: string
  area: number
}

interface SquareConfig {
  color?: string,
  width?: number,

  [propName: string]: any
}

function createSquare (config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })

//只读属性
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }

//函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}

//可索引的类型
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]

//类类型
interface ClockInterface {
  currentTime: Date

  setTime (d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date

  setTime (d: Date) {
    this.currentTime = d
  }

  constructor (h: number, m: number) { }
}

//接口继承
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select (): void
}

class Button extends Control implements SelectableControl {
  select () { }
}

class TextBox extends Control {
  select () { }
}

//混合类型
interface Counter {
  (start: number): string

  interval: number

  reset (): void
}

function getCounter (): Counter {
  let counter = (function (start: number) { }) as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

//接口继承类
class Control1 {
  private state: any
}

interface SelectableControl1 extends Control1 {
  select (): void
}

class Button1 extends Control1 implements SelectableControl1 {
  select () { }
}

class TextBox1 extends Control {
  select () { }
}
