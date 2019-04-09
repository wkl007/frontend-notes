[TOC]

## TypeScript学习笔记

- TypeScript介绍
- TypeScript的优势
- 搭建TypeScript开发环境
- TypeScript概念、语法和特性介绍

### 1. TypeScript介绍

> *TypeScript是JavaScript类型的超集，它可以编程成纯JavaScript。TypeScript可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。*

### 2. TypeScript的优势

- 支持ES6规范

- 强大的IDE支持

- Angular的开发语言
### 3. 搭建TypeScript开发环境

#### 3.1 TypeScript-在线compiler

[在线编译网址](https://www.imooc.com/video/13520 )

#### 3.2 TypeScript-本地compiler

安装TypeScript

```javascript
npm install -g typescript
```

新建Hello.ts

```typescript
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

编译代码

```javascript
tsc Hello.ts
```

### 4. TypeScript概念、语法和特性介绍

#### 4.1 字符串新特性

- 多行字符串
- 字符串模板
- 自动拆分字符串

```typescript
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
```

#### 4.2 参数新特性

- 参数类型
- 默认参数
- 可选参数

##### 4.2.1 参数类型

在参数名称后面使用冒号来指定参数的类型

- 布尔值
- 数字
- 字符串
- 数组
- 元组
- 枚举
- Any
- Void
- Null和Undefined
- Never
- Object

###### 4.2.1.1 布尔值

```typescript
let isDone: boolean = false
```

###### 4.2.1.2 数字

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

###### 4.2.1.3 字符串

```typescript
let name: string = "bob";
name = "smith";
```

###### 4.2.1.4 数组

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

###### 4.2.1.5 元组

```typescript
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

###### 4.2.1.6 枚举

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

###### 4.2.1.7 Any

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

###### 4.2.1.8 Void

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

###### 4.2.1.9 Null和Undefined

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

###### 4.2.1.10 Never

`never`类型表示的是那些永不存在的值的类型。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

###### 4.2.1.11 Object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
```

##### 4.2.2 默认参数

在参数声明后面使用等号来指定参数的默认值。在方法中声明默认参数时必须放在最后面。

```typescript
function defaultValue (a: string, b: string, c: string = 'wkl') {
  console.log(a, b, c)
}

defaultValue('a', 'b')
```

##### 4.2.3 可选参数

在方法的参数声明后面用问号来标明词参数为可选参数。可选参数不能声明在必选参数后面。

```typescript
function optionalValue (a: string, b?: string, c: string = 'wkl') {
  console.log(a, b, c)
}

optionalValue('a')
```

#### 4.3 函数新特性

- Rest and Spread 操作符
- generator函数

##### 4.3.1 Rest and Spread 操作符

用来声明任意数量的方法参数

```typescript
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
```

##### 4.3.2 generator函数

控制函数的执行过程，手动暂停和恢复代码执行

```typescript
function * doSomething () {
  console.log('start')
  yield
  console.log('finish')
}

let do1 = doSomething()

// @ts-ignore
do1.next()//start
// @ts-ignore
do1.next()//finish
```

##### 4.3.2 destructuring析构表达式

通过表达式将对象或数组拆分成任意数量的变量

```typescript
//对象
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

//数组
let arr = [1, 2, 3, 4]

let [number1, number2] = arr//1 2
let [, , number1, number2] = arr//3 4
let [number1, , , number2] = arr//1 4
let [number1, number2, ...others] = arr//1 2 3 4

function test1 ([number1, number2, ...others]) {
  console.log(number1, number2, others)
}

// @ts-ignore
test1(arr)
```

####  4.4 表达式与循环

- 箭头表达式

- for of 循环

##### 4.4.1 箭头表达式

用来声明匿名函数，消除传统匿名函数的this指向问题

```typescript
let sum = (arg1, arg2) => arg1 + arg2

let myArray = [1, 2, 3, 4, 5]
console.log(myArray.filter(value => value % 2 === 0))
```

##### 4.4.1 for of循环

`forEach()`、 `for in`、 `for of`

```typescript
let arr1 = [1, 2, 3, 4]

arr1.forEach(i => console.log(i))

for (let i in arr1) {
  console.log(arr1[i])
}

for (let i of arr1) {
  if (i > 2) break
  console.log(i)
}
```

#### 4.4 面向对象特性

- 类
- 泛型
- 接口
- 模块
- 注解
- 类型定义文件

##### 4.4.1 类（class）

类是TypeScript的核心，使用TypeScript开发时，大部分代码都是写在类里面的。

```typescript
class Person {
  constructor (public name: string, public age: number) {}
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
```



利用extends关键字继承父类所有的属性和方法（class childBall extends Ball{ }）
在子类的构造函数中调用super（）可以继承父类构造函数里面的属性
在子类方法中调用 super.（父类方法）可以实现子类继承父类的方法

##### 4.4.2 泛型（generic）

参数化的类型，一般用来限制集合的内容。

```typescript
...
let workers: Array<Person> = []
workers[0] = new Person('张三', 21)
workers[1] = new Person('李四', 21)
```

##### 4.4.3 接口（interface）

用来建立某种代码约定，使得其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。

```typescript
interface IPerson {
  name: string,
  age: number
}
class Person2 {
  constructor (public config: IPerson) {}
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
```

##### 4.4.4 模块（Module）

模块可以帮助开发者将代码分割为可重用的单元。开发者可以自己决定将模块中的哪些资源（类、方法、变量）暴露出去供外部使用，哪些资源只在模块内使用。

`export` `import`

##### 4.4.5 注解（annotation）

注解为程序的元素（类、方法、变量）加上更直观明了的说明，这些说明与程序的业务逻辑无关，而是供指定的工具或框架使用。

`@xxx`

##### 4.4.6 类型定义文件（*.d.ts）

类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript的工具包。如：jquery

TypeScript 现在已经可以通过 npm install @types/库名 来安装类型定义文件了，这样可以把ts项目所需要的定义文件描述到npm包里，维护起来更加方便。