class Greeter {
  greeting: string

  constructor (message: string) {
    this.greeting = message
  }

  greet () {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')

//继承
class Animal {
  move (distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark () {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)

//公共，私有与受保护的修饰符
class Animal1 {
  public name: string

  public constructor (name: string) {
    this.name = name
  }

  public move (distance: number) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Anima2 {
  private name: string

  constructor (name: string) {
    this.name = name
  }
}

//存取器
let passcode = 'secret passcode'

class Employee {
  private _fullName: string

  get fullName (): string {
    return this._fullName
  }

  set fullName (newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}

//静态属性
class Grid {
  static origin = { x: 0, y: 0 }

  scale: number

  constructor (scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin (point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }))

//抽象类
abstract class Department {
  name: string

  constructor (name: string) {
    this.name = name
  }

  printName (): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting (): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor () {
    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
  }

  printMeeting (): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports (): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
