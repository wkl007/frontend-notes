[TOC]

## Dart 学习笔记

### 1. 基本介绍

`hello_world.dart`

- main方法是固定写法，它是程序入口
- print方法可以在控制台输出内容
- 通过文件选择run，可以运行文件中的main方法

```dart
void main() {
  // 控制台打印
  print('Hello， World!');
}
```

### 2. 数据类型

#### 2.1 变量与常量

变量

- 使用var声明变量，可赋予不同类型的值
- 初始化时，默认值为null
- 使用final声明一个只能赋值一次的变量

常量

- 使用const声明常量
- 使用const声明的必须是编译期常量

Dart中的内置类型

- 数值型-Number
- 字符串-String
- 布尔型-Boolean
- 列表-List
- 键值对-Map
- Runes、Symbols

#### 2.2 数值型

- 整型-Int
- 浮点型-Double

数值型操作

- 运算符：+、-、*、/、~/、%
- 常用属性：isNaN、isEven、isOdd等
- 常用方法：abs()、round()、floor()、ceil()、toInt()、toDouble()等

#### 2.3 字符串

- 使用单引号，双引号创建字符串
- 使用三个引号或双引号创建多行字符串
- 使用r创建原始raw字符串

字符串操作

- 运算符：+、*、==、[]  
- 差值表达式：${experssion}
- 常用属性：length、isEmpty、isNotEmpty

常用方法

- contains()，subString()
- startsWith()，endsWith()
- indexOf()，lastIndexOf()
- toLowerCase()，toUpperCase()
- trim()，trimLeft()，trimRight()
- split()，replaceXXX()

#### 2.4 布尔型

- 使用bool表示布尔类型
- 布尔值只有true和false

#### 2.5 列表List

- 创建List：var list=[1，2，3]
- 创建不可变的List：var list=const [1，2，3]
- 构造创建：var list=new List()

列表操作

- []，length
- add()，insert()
- remove()，clear()
- indexOf()，lastIndexOf()
- sort()，sublist()
- shuffle()，asMap()，forEach()

#### 2.6 Map

- 创建Map：var language={'first':'Dart'，'second':'javascript'}
- 创建不可变Map：var language=const {'first':'Dart'，'second':'javascript'}
- 构造创建：var language=new Map()

map操作

- []，length
- isEmpty()，isNotEmpty()
- keys，values
- containsKey()，containsValue()
- remove()
- forEach()

#### 2.7 dynamic

动态类型可以赋予不同的值

### 3. 运算符

#### 3.1 算术运算符

- 加减乘除：+、-、*、/、~/、%
- 递增递减：++var，var++，--var，var--

#### 3.2 关系运算符

- 运算符：==，!=，>，<，>=，<=
- 判断内容是否相同使用：==

#### 3.3 逻辑运算符

- 运算符：!，&&，||
- 针对布尔类型运算

#### 3.4 赋值运算符

- 基础运算符：=，??=
- 复合运算符：+=，-=，*=，/=，%=，~/=

#### 3.5 条件表达式

- 三元运算符：condition?expr1:expr2
- ??运算符：expr1??expr2

### 4. 控制语句

#### 4.1 if语句

- if 语句
- if...else if 语句
- if...else if...else 语句

#### 4.2 for语句

- for 循环
- for...in 循环

#### 4.3 while语句

- while 循环
- do...while 循环

#### 4.4 break和continue

- 终止循环：break
- 跳出当前循环：continue

#### 4.5 switch...case语句

- 比较类型：num，String，编译期常量，对象，枚举
- 非空case必须有一个break
- default 处理默认情况
- continue 跳转标签

### 5. 方法

#### 5.1 方法定义

```dart
返回类型 方法名 (参数1，参数2，...){
    方法体...
    return 返回值
}
```

方法特性

- 方法也是对象，并且有具体类型Function
- 返回值类型，参数类型都可以省略
- 箭头语法：=>expr 是{return expr;}缩写，只适合用于一个表达式
- 方法都有返回值，如果没有定义，默认返回null最后一句执行

#### 5.2 可选参数

- 可选命名参数：{param1,param2,...}
- 可选位置参数：[param1,param2,...]
- 如果存在具体参数，可选参数命名，必须在参数后面

#### 5.3 默认参数值

- 使用 = 在可选参数指定默认值
- 默认值只能是编译时常量

#### 5.4 方法对象

- 方法可作为对象赋值给其他变量
- 方法可作为参数传给其他方法

#### 5.5 匿名方法

```dart
(参数1，参数2，...){
    方法体...
    return 返回值
}
```

匿名方法特性

- 可赋值给变量，通过变量进行调用
- 可在其他方法中直接调用或传递给其他方法

#### 5.6 闭包

- 闭包是一个方法（对象）
- 闭包定义在其他方法内部
- 闭包能够访问外部方法内的局部变量，并持有其状态

### 6. Dart面向对象编程

#### 6.1 类与对象

#### 6.2 计算属性

#### 6.3 构造方法

#### 6.4 常量构造方法

#### 6.5 工厂构造方法

#### 6.6 初始化列表

#### 6.7 静态成员

#### 6.8 对象操作符

#### 6.9 对象call方法

#### 6.10 继承

#### 6.11 继承中的构造方法

#### 6.13 抽象类

#### 6.14 接口

#### 6.15 Mixins

#### 6.16 操作符覆写

### 7. 枚举&类型

#### 7.1 枚举

#### 7.2 范型