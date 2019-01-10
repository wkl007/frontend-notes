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

#### 4.2 TypeScript-参数类型

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

##### 4.2.1 布尔值

```typescript
let isDone: boolean = false
```

##### 4.2.2 数字

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

##### 4.2.3 字符串

```typescript
let name: string = "bob";
name = "smith";
```

##### 4.2.4 数组

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

##### 4.2.5 元组

```typescript
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

##### 4.2.6 枚举

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

##### 4.2.7 Any

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

##### 4.2.8 Void

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

##### 4.2.9 Null和Undefined

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

##### 4.2.10 Never

`never`类型表示的是那些永不存在的值的类型。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

##### 4.2.11 Object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
```

#### 4.3 TypeScript-默认参数

在参数声明后面使用等号来指定参数的默认值。在方法中声明默认参数时必须放在最后面。

```typescript
function defaultValue (a: string, b: string, c: string = 'wkl') {
  console.log(a, b, c)
}

defaultValue('a', 'b')
```

#### 4.4 TypeScript-可选参数

在方法的参数声明后面用问号来标明词参数为可选参数。可选参数不能声明在必选参数后面。

```typescript
function optionalValue (a: string, b?: string, c: string = 'wkl') {
  console.log(a, b, c)
}

optionalValue('a')
```

