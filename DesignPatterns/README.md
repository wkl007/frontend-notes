# JavaScript 设计模式核心原理与应用实践

![JavaScript设计模式](https://user-gold-cdn.xitu.io/2019/5/13/16ab0c39cfa5125d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 设计模式的“道”和“术”

### 设计模式的"道"

#### SOLID设计原则

> "SOLID" 是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。

设计原则是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID 指代的五个基本原则分别是：

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

在 JavaScript 设计模式中，主要用到的设计模式基本都围绕“单一功能”和“开放封闭”这两个原则来展开。

#### 设计模式的核心思想——封装变化

在实际开发中，不发生变化的代码可以说是不存在的。我们能做的只有将这个变化造成的影响**最小化** —— **将变与不变分离，确保变化的部分灵活、不变的部分稳定**。

这个过程，就叫“封装变化”；这样的代码，就是我们所谓的“健壮”的代码，它可以经得起变化的考验。而设计模式出现的意义，就是帮我们写出这样的代码。

### 设计模式的“术”

![](https://user-gold-cdn.xitu.io/2019/4/6/169f16406d230ffe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 创建型：工厂模式·简单工厂

### 构造器

```javascript
/**
 * 构造器
 * @param name
 * @param age
 * @param career
 * @param work
 * @constructor
 */
function User (name, age, career, work) {
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}

const user = new User('李雷', 25, 'coder', ['写代码', '写系分', '修Bug'])
```

### 简单工厂模式

```javascript
/**
 * 简单工厂模式
 * @param name
 * @param age
 * @param career
 * @returns {*[]|User}
 * @constructor
 */
function Factory (name, age, career) {
  let work
  switch (career) {
    case 'coder':
      work = ['写代码', '写系分', '修Bug']
      break
    case 'product manager':
      work = ['订会议室', '写PRD', '催更']
      break
    case 'boss':
      work = ['喝茶', '看报', '见客户']
      break
    default:
      return []
  }
  return new User(name, age, career, work)
}
```

总结一下：工厂模式的目的，就是为了实现**无脑传参**，就是为了爽！

## 创建型：工厂模式·抽象工厂

### 抽象工厂模式

```javascript
class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
    // 提供硬件的接口
    createHardWare(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}

// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件')
    }
}
...

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}
...


// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()
```

### 总结

抽象工厂和简单工厂的异同：

它们的共同点，在于都**尝试去分离一个系统中变与不变的部分**。它们的不同在于**场景的复杂度**。在简单工厂的使用场景里，处理的对象是类，并且是一些非常好对付的类——它们的共性容易抽离，同时因为逻辑本身比较简单，故而不苛求代码可扩展性。抽象工厂本质上处理的其实也是类，但是是一帮非常棘手、繁杂的类，这些类中不仅能划分出门派，还能划分出等级，同时存在着千变万化的扩展可能性——这使得我们必须对**共性**作更特别的处理、使用抽象类去降低扩展的成本，同时需要对类的性质作划分，于是有了这样的四个关键角色：

- **抽象工厂（抽象类，它不能被用于生成具体实例）：** 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
- **具体工厂（用于生成产品族里的一个具体的产品）：** 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
- **抽象产品（抽象类，它不能被用于生成具体实例）：** 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
- **具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）：** 比如我们上文中具体的一种操作系统、或具体的一种硬件等。

## 创建型：单例模式

### 单例模式的实现思路

静态方法版

```javascript
class SingleDog {
  static getInstance () {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog()
    }
    return SingleDog.instance
  }

  show () {
    console.log('我是一个单例对象')
  }
}
```

闭包版

```javascript
function BaseDog () {}

BaseDog.prototype.show = function () {
  console.log('我是一个单例对象')
}

const SingleDog = (function () {
  // 定义自由变量instance，模拟私有变量
  let instance = null
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new BaseDog()
    }
    return instance
  }
})()
```

### 生产实践：Vuex中的单例模式

> Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。 ——Vuex官方文档

在 `install` 方法里，有一段逻辑和我们楼上的 `getInstance` 非常相似的逻辑：

```javascript
let Vue // 这个Vue的作用和楼上的instance作用一样
...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}
```

### 实现一个Storage

实现`Storage`，使得该对象为单例，基于 `localStorage` 进行封装。实现方`setItem(key,value)` 和 `getItem(key)`。

静态方法版

```javascript
class Storage {
  static getInstance () {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }
    return Storage.instance
  }

  getItem (key) {
    return localStorage.getItem(key)
  }

  setItem (key, value) {
    return localStorage.setItem(key, value)
  }
}
```

闭包版

```javascript
function StorageBase () {}

StorageBase.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}

StorageBase.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}

const Storage = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new StorageBase()
    }
    return instance
  }
})()
```

### 实现一个全局的模态框

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
  #modal {
    height: 200px;
    width: 200px;
    line-height: 200px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    text-align: center;
  }
  </style>
</head>
<body>
<button id='open'>打开弹框</button>
<button id='close'>关闭弹框</button>
<script>
const Modal = (function () {
  let modal = null
  return function () {
    if (!modal) {
      modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

// 点击打开按钮展示模态框
document.getElementById('open').addEventListener('click', function () {
  // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
  const modal = new Modal()
  modal.style.display = 'block'
})

// 点击关闭按钮隐藏模态框
document.getElementById('close').addEventListener('click', function() {
  const modal = new Modal()
  if(modal) {
    modal.style.display = 'none'
  }
})
</script>
</body>
</html>
```

## 创建型：原型模式

原型模式不仅是一种设计模式，它还是一种**编程范式**（programming paradigm），是 JavaScript 面向对象系统实现的根基。

### 原型

在 JavaScript 中，每个构造函数都拥有一个`prototype`属性，它指向构造函数的原型对象，这个原型对象中有一个 `construtor` 属性指回构造函数；每个实例都有一个`__proto__`属性，当我们使用构造函数去创建实例时，实例的`__proto__`属性就会指向构造函数的原型对象。

具体来说，当我们这样使用构造函数创建一个对象时：

```javascript
// 创建一个Dog构造函数
function Dog(name, age) {
  this.name = name
  this.age = age
}

Dog.prototype.eat = function() {
  console.log('肉骨头真好吃')
}

// 使用Dog构造函数创建dog实例
const dog = new Dog('旺财', 3)
```

这段代码里的几个实体之间就存在着这样的关系：

![](https://user-gold-cdn.xitu.io/2019/3/11/1696bfe41aa0a184?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 原型链

现在我在上面那段代码的基础上，进行两个方法调用:

```javascript
// 输出"肉骨头真好吃"
dog.eat()

// 输出"[object Object]"
dog.toString()
```

明明没有在 dog 实例里手动定义 eat 方法和 toString 方法，它们还是被成功地调用了。这是因为当我试图访问一个 JavaScript 实例的属性/方法时，它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。

![](https://user-gold-cdn.xitu.io/2019/3/11/1696bfd959ce30b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

楼上这些彼此相连的`prototype`，就组成了一个原型链。 注： 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了`Object.prototype`（当然，如果我们手动用`Object.create(null)`创建一个没有任何原型的对象，那它也不是 Object 的实例）。

### 对象的深拷贝

`JSON.stringify`方法

```javascript
const LiLei = {
  name: 'lilei',
  age: 28,
  habits: ['coding', 'hiking', 'running']
}
const LiLeiStr = JSON.stringify(LiLei)
const LiLeiCopy = JSON.parse(LiLeiStr)

LiLeiCopy.habits.splice(0, 1)

console.log('李雷副本的habits数组是', LiLeiCopy.habits)
console.log('李雷的habits数组是', LiLei.habits)
```

但是注意，这个方法存在一些局限性，比如无法处理 function、无法处理正则等等——只有当你的对象是一个严格的 JSON 对象时，可以顺利使用这个方法。

递归方法

```javascript
function deepClone (obj) {
  // 如果是 值类型 或 null，则直接return
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 定义结果对象
  let copy = {}

  // 如果对象是数组，则定义结果数组
  if (obj.constructor === Array) {
    copy = []
  }

  // 遍历对象的key
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key])
    }
  }
  return copy
}
```

## 结构型：装饰器模式

![](https://user-gold-cdn.xitu.io/2019/4/19/16a35a6ccf7b4d82?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这个手机壳的安装方式和普通手机壳一样，就是卡在手机背面。不同的是它卡上去后会变成一块水墨屏，这样一来我们手机就有了两个屏幕。平时办公或者玩游戏的时候，用正面的普通屏幕；阅读的时候怕伤眼睛，就可以翻过来用背面的水墨屏了。

这个水墨屏手机壳安装后，**不会对手机原有的功能产生任何影响，仅仅是使手机具备了一种新的能力**（多了块屏幕），因此它在此处就是一个标准的装饰器。

### ES7中的装饰器

给一个类添加装饰器

```javascript
// 装饰器函数，它的第一个参数是目标类
function classDecorator (target) {
  target.hasDecorator = true
  return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {

}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator)
```

给一个方法添加装饰器

```javascript
function funcDecorator (target, name, descriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
  @funcDecorator
  onClick () {
    console.log('我是Func的原有逻辑')
  }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()
```

### 生产实践

#### React中的装饰器：HOC

> 高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

我们现在编写一个高阶组件，它的作用是把传入的组件**丢进一个有红色边框的容器里**（拓展其样式）。

```jsx
import React, { Component } from 'react'

const BorderHoc = WrappedComponent => class extends Component {
  render() {
    return <div style={{ border: 'solid 1px red' }}>
      <WrappedComponent />
    </div>
  }
}
export default borderHoc


import React, { Component } from 'react'
import BorderHoc from './BorderHoc'
```
用它来装饰目标组件
```jsx
// 用BorderHoc装饰目标组件
@BorderHoc 
class TargetComponent extends React.Component {
  render() {
    // 目标组件具体的业务逻辑
  }
}

// export出去的其实是一个被包裹后的组件
export default TargetComponent
```

#### Redux中的装饰器

```javascript
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import action from './action.js'

function mapStateToProps(state) {
  return state.app
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(action, dispatch)
}

// 将connect调用后的结果作为一个装饰器导出
export default connect(mapStateToProps, mapDispatchToProps)
```

在组件文件里引入connect：

```jsx
import React, { Component } from 'react'
import connect from './connect.js'   

@connect
export default class App extends Component {
  render() {
    // App的业务逻辑
  }
}
```

## 结构型：适配器模式

适配器模式通过**把一个类的接口变换成客户端所期待的另一种接口**，可以帮我们解决**不兼容**的问题。

### 生产实践

#### aixos中的适配器

调用适配器

```javascript
// 若用户未手动配置适配器，则使用默认的适配器
var adapter = config.adapter || defaults.adapter;

// dispatchRequest方法的末尾调用的是适配器方法
return adapter(config).then(function onAdapterResolution(response) {
  // 请求成功的回调
  throwIfCancellationRequested(config);

  // 转换响应体
  response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse
  );

  return response;
}, function onAdapterRejection(reason) {
  // 请求失败的回调
  if (!isCancel(reason)) {
    throwIfCancellationRequested(config);

    // 转换响应体
    if (reason && reason.response) {
      reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse
      );
    }
  }

  return Promise.reject(reason);
});
```

实际开发中，我们使用默认适配器的频率更高。默认适配器在[`axios/lib/default.js`](https://github.com/axios/axios/blob/master/lib/defaults.js)里是通过`getDefaultAdapter`方法来获取的：

```javascript
function getDefaultAdapter() {
  var adapter;
  // 判断当前是否是node环境
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // 如果是node环境，调用node专属的http适配器
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // 如果是浏览器环境，调用基于xhr的适配器
    adapter = require('./adapters/xhr');
  }
  return adapter;
}
```

## 结构型：代理模式

代理模式，式如其名——在某些情况下，出于种种考虑/限制，一个对象**不能直接访问**另一个对象，需要一个**第三者**（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。

### 事件代理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>事件代理</title>
</head>
<body>
<div id="father">
  <a href="#">链接1号</a>
  <a href="#">链接2号</a>
  <a href="#">链接3号</a>
  <a href="#">链接4号</a>
  <a href="#">链接5号</a>
  <a href="#">链接6号</a>
</div>
<script>
// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function (e) {
  // 识别是否是目标子元素
  if (e.target.tagName === 'A') {
    // 以下是监听函数的函数体
    e.preventDefault()
    alert(`我是${e.target.innerText}`)
  }
})
</script>
</body>
</html>
```

### 虚拟代理

### 缓存代理

### 保护代理

## 行为型：策略模式

## 行为型：状态模式

## 行为型：观察者模式

> 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。 —— Graphic Design Patterns

观察者模式，是所有 JavaScript 设计模式中**使用频率**最高，**面试频率也最高**的设计模式，所以说它**十分重要**——如果我是面试官，考虑到面试时间有限、设计模式这块不能多问，我可能在考查你设计模式的时候只会问观察者模式这一个模式。

发布者

```javascript
// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created')
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}
```

订阅者

```javascript
// 定义订阅者类
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
    }
}
```

定义一个具体的需求文档发布类

```javascript
// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
    constructor() {
        super()
        // 初始化需求文档
        this.prdState = null
        // 韩梅梅还没有拉群，开发群目前为空
        this.observers = []
        console.log('PrdPublisher created')
    }
    
    // 该方法用于获取当前的prdState
    getState() {
        console.log('PrdPublisher.getState invoked')
        return this.prdState
    }
    
    // 该方法用于改变prdState的值
    setState(state) {
        console.log('PrdPublisher.setState invoked')
        // prd的值发生改变
        this.prdState = state
        // 需求文档变更，立刻通知所有开发者
        this.notify()
    }
}
```

作为订阅方，开发者的任务也变得具体起来：接收需求文档、并开始干活：

```javascript
class DeveloperObserver extends Observer {
    constructor() {
        super()
        // 需求文档一开始还不存在，prd初始为空对象
        this.prdState = {}
        console.log('DeveloperObserver created')
    }
    
    // 重写一个具体的update方法
    update(publisher) {
        console.log('DeveloperObserver.update invoked')
        // 更新需求文档
        this.prdState = publisher.getState()
        // 调用工作函数
        this.work()
    }
    
    // work方法，一个专门搬砖的方法
    work() {
        // 获取需求文档
        const prd = this.prdState
        // 开始基于需求文档提供的信息搬砖。。。
        ...
        console.log('996 begins...')
    }
}
```

最终结果

```javascript
// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
    // 具体的需求内容
    ...
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)
```

### 生产实践

#### Vue数据双向绑定（响应式系统）的实现原理

Vue 框架是热门的渐进式 JavaScript框架。在 Vue 中，当我们修改状态时，视图会随之更新，这就是Vue的数据双向绑定（又称响应式原理）。数据双向绑定是Vue 最独特的特性之一。如果读者没有接触过 Vue，强烈建议阅读[Vue官方对响应式原理的介绍](https://cn.vuejs.org/v2/guide/reactivity.html)。此处我们用官方的一张流程图来简要地说明一下Vue响应式系统的整个流程：

![](https://user-gold-cdn.xitu.io/2019/3/31/169d2aa6ea6dd122?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在Vue数据双向绑定的实现逻辑里，有这样三个关键角色：

- observer（监听器）：注意，此 observer 非彼 observer。在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。但在Vue数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，它还需要对监听到的数据进行**转发**——也就是说它**同时还是一个发布者**。
- watcher（订阅者）：observer 把数据转发给了**真正的订阅者**——watcher对象。watcher 接收到新的数据后，会去更新视图。
- compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~
  这三者的配合过程如图所示：

![](https://user-gold-cdn.xitu.io/2019/4/5/169ecc97fbcf1dc5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### Event Bus/Event Emitter

Event Bus（Vue、Flutter 等前端框架中有出镜）和 Event Emitter（Node中有出镜）出场的“剧组”不同，但是它们都对应一个共同的角色——**全局事件总线**。
全局事件总线，严格来说不能说是观察者模式，而是发布-订阅模式。它在我们日常的业务开发中应用非常广。

```javascript
const EventBus = new Vue()
export default EventBus

import bus from 'EventBus的文件路径'
Vue.prototype.bus = bus

// 这里func指someEvent这个事件的监听函数
this.bus.$on('someEvent', func)


// 这里params指someEvent这个事件被触发时回调函数接收的入参
this.bus.$emit('someEvent', params)
```

### 观察者模式与发布-订阅模式的区别是什么？

观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者（如图所示）。

![](https://user-gold-cdn.xitu.io/2019/4/5/169ed4923a4f51b7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2019/4/5/169ed4a77700d98e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 行为型：迭代器模式

> 迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。 ——《设计模式：可复用面向对象软件的基础》

迭代器模式是设计模式中少有的**目的性极强的模式**。所谓“目的性极强”就是说它不操心别的，它就解决这一个问题——遍历。

```javascript
// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined
            
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()
```

