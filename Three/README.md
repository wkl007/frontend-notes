# Three.js学习笔记

## 1. Three.js快速入门-新手上路

### 1.1 Three.js第一个3D场景

Three.js程序结构如图

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915142114.png" alt="image-20200915142102679" style="zoom: 80%;" />

### 1.2 旋转动画、requestAnimationFrame周期性渲染

周期性渲染

```javascript
// 渲染函数
function render() {
    renderer.render(scene,camera) // 执行渲染操作
    mesh.rotateY(0.01) // 每次绕y轴旋转0.01弧度
}
// 间隔20ms周期性调用函数fun,20ms也就是刷新频率是50FPS(1s/20ms)，每秒渲染50次
setInterval("render()",20);
```

函数`requestAnimationFrame`

```javascript
function render() {
    renderer.render(scene, camera) // 执行渲染操作
    mesh.rotateY(0.01) // 每次绕y轴旋转0.01弧度
    requestAnimationFrame(render) // 请求再次执行渲染函数render
}
render();
```

匀速旋转

```javascript
let T0 = new Date();//上次时间
function render() {
    let T1 = new Date() // 本次时间
    let t = T1 - T0 //时间差
    T0 = T1 //把本次时间赋值给上次时间
    requestAnimationFrame(render)
    renderer.render(scene, camera) //执行渲染操作
    mesh.rotateY(0.001 * t)//旋转角速度0.001弧度每毫秒
}
render();
```

### 1.3 鼠标操作三维场景

为了使用鼠标操作三维场景，可以借助three.js众多控件之一`OrbitControls.js`。

```javascript
function render () {
    renderer.render(scene, camera) // 执行渲染操作
    // mesh.rotateY(0.01) // 每次绕y轴旋转0.01弧度
    requestAnimationFrame(render) // 请求再次执行渲染函数render
}

render()
const controls = new THREE.OrbitControls(camera, renderer.domElement) // 创建控件对象
// 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
// controls.addEventListener('change', render) // 监听鼠标、键盘事件
```

### 1.4 场景中插入新的几何体

几何体

```javascript
const geometry = new THREE.BoxGeometry(100, 100, 100) // 长方体 长、宽、搞

const geometry = new THREE.SphereGeometry(60, 40, 40) // 球体 半径、水平细分数、垂直细分数

const geometry = new THREE.CylinderGeometry(50, 50, 100, 25) // 圆柱  圆柱面顶部、底部直径、高度、 圆周分段数

const geometry = new THREE.OctahedronGeometry(50) // 正八面体

const geometry = new THREE.DodecahedronGeometry(50) // 正十二面体

const geometry = new THREE.IcosahedronGeometry(50) // 正二十面体
```

辅助三维坐标系`AxisHelper`

```javascript
// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
const axesHelper = new THREE.AxesHelper(250)
scene.add(axesHelper)
```

### 1.5 材质效果

半透明效果

```javascript
const material2 = new THREE.MeshLambertMaterial({
    color: 0xff00ff,
    opacity: 0.7,
    transparent: true,
})

material.opacity = 0.5 ;
material.transparent = true ;
```

| 材质属性    | 简介                                       |
| :---------- | :----------------------------------------- |
| color       | 材质颜色，比如蓝色0x0000ff                 |
| wireframe   | 将几何图形渲染为线框。 默认值为false       |
| opacity     | 透明度设置，0表示完全透明，1表示完全不透明 |
| transparent | 是否开启透明，默认false                    |

添加高光效果

```javascript
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    specular: 0x4488ee,
    shininess: 20
})
```

材质类型

| 材质类型                                                     | 功能                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [MeshBasicMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshBasicMaterial) | 基础网格材质，不受光照影响的材质                             |
| [MeshLambertMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshLambertMaterial) | Lambert网格材质，与光照有反应，漫反射                        |
| [MeshPhongMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshPhongMaterial) | 高光Phong材质,与光照有反应                                   |
| [MeshStandardMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshStandardMaterial) | PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果 |

### 1.6 光照效果

| 光源                                                         | 简介               |
| :----------------------------------------------------------- | :----------------- |
| [AmbientLight](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/AmbientLight) | 环境光             |
| [PointLight](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/PointLight) | 点光源             |
| [DirectionalLight](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/DirectionalLight) | 平行光，比如太阳光 |
| [SpotLight](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/SpotLight) | 聚光源             |

环境光创建

```javascript
// 环境光 环境光颜色与网格模型的颜色进行RGB进行乘法运算
const ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)
```

点光源创建

```javascript
const point = new THREE.DirectionalLight(0xffffff)
point.position.set(400, 200, 300) // 点光源位置
scene.add(point) // 点光源添加到场景中
```

## 2. 顶点概念、几何体结构

### 2.1 顶点位置数据解析渲染

自定义几何体

```javascript
const geometry = new THREE.BufferGeometry() // 创建一个Buffer类型几何体对象
// 类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
])
const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
geometry.attributes.position = attribue // 设置几何体attributes属性的位置属性
```

### 2.2 顶点颜色数据插值计算

```javascript
  // 立方体网格模型
  const geometry = new THREE.BufferGeometry() // 创建一个Buffer类型几何体对象
  // 类型数组创建顶点数据
  const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标

    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
  ])
  const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
  geometry.attributes.position = attribue // 设置几何体attributes属性的位置属性
  // 类型数组创建顶点颜色color数据
  const colors = new Float32Array([
    1, 0, 0, //顶点1颜色
    0, 1, 0, //顶点2颜色
    0, 0, 1, //顶点3颜色

    1, 1, 0, //顶点4颜色
    0, 1, 1, //顶点5颜色
    1, 0, 1, //顶点6颜色
  ])
  // 设置几何体attributes属性的颜色color属性
  geometry.attributes.color = new THREE.BufferAttribute(colors, 3) // 3个为一组,表示一个顶点的颜色数据RGB

  // 点渲染模式
  const material = new THREE.PointsMaterial({
    // 使用顶点颜色数据渲染模型，不需要再定义color属性
    // color: 0xff0000,
    vertexColors: THREE.VertexColors, // 以顶点颜色为准
    size: 10.0 // 点对象像素尺寸
  })
```

### 2.3 顶点法向量数据光照计算

```javascript
  // 立方体网格模型
  const geometry = new THREE.BufferGeometry() // 创建一个Buffer类型几何体对象
  // 类型数组创建顶点数据
  const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标

    0, 0, 0, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 0, //顶点6坐标
  ])
  const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
  geometry.attributes.position = attribue // 设置几何体attributes属性的位置属性

  const normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量

    0, 1, 0, //顶点4法向量
    0, 1, 0, //顶点5法向量
    0, 1, 0, //顶点6法向量
  ])
  // 设置几何体attributes属性的位置normal属性
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据
```

API使用总结

```javascript
// 访问几何体顶点位置数据
BufferGeometry.attributes.position
// 访问几何体顶点颜色数据
BufferGeometry.attributes.color
// 访问几何体顶点法向量数据
BufferGeometry.attributes.normal
```

### 2.4 顶点索引复用顶点数据

```javascript
// 立方体网格模型
  const geometry = new THREE.BufferGeometry() // 创建一个Buffer类型几何体对象
  // 类型数组创建顶点数据
  const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 80, 0, //顶点4坐标
  ])
  const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
  geometry.attributes.position = attribue // 设置几何体attributes属性的位置属性

  const normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量
    0, 0, 1, //顶点4法向量
  ])
  // 设置几何体attributes属性的位置normal属性
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3) //3个为一组,表示一个顶点的法向量数据

  const indexes = new Uint16Array([
    // 0对应第1个顶点位置数据、第1个顶点法向量数据
    // 1对应第2个顶点位置数据、第2个顶点法向量数据
    // 索引值3个为一组，表示一个三角形的3个顶点
    0, 1, 2,
    0, 2, 3,
  ])
  // 索引数据赋值给几何体的index属性
  geometry.index = new THREE.BufferAttribute(indexes, 1) // 1个为一组
```

| 类型数组     | 位数 | 字节 | 类型描述           | C语言等价类型 |
| :----------- | :--- | :--- | :----------------- | :------------ |
| Int8Array    | 8    | 1    | 有符号8位整型      | int8_t        |
| Uint8Array   | 8    | 1    | 无符号8位整型      | uint8_t       |
| Int16Array   | 16   | 2    | 有符号16位整型     | int16_t       |
| Uint16Array  | 16   | 2    | 无符号16位整型     | int16_t       |
| Int32Array   | 32   | 4    | 有符号32位整型     | int32_t       |
| Uint32Array  | 32   | 4    | 无符号32位整型     | uint32_t      |
| Float32Array | 32   | 4    | 单精度(32位)浮点数 | float         |
| Float64Array | 64   | 8    | 双精度(64位)浮点数 | double        |

`BufferGeometry`总结

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915144855.png" alt="image-20200915144854044" style="zoom:80%;" />

### 2.5 设置Geometry顶点位置、顶点颜色数据

```javascript
  // 立方体网格模型
  const geometry = new THREE.Geometry() // 创建一个Buffer类型几何体对象
  const p1 = new THREE.Vector3(50, 0, 0) // 顶点1坐标
  const p2 = new THREE.Vector3(0, 70, 0) // 顶点1坐标
  const p3 = new THREE.Vector3(80, 70, 0) // 顶点3坐标
  geometry.vertices.push(p1, p2, p3)

  const color1 = new THREE.Color(0x00ff00) // 顶点1颜色——绿色
  const color2 = new THREE.Color(0xff0000) // 顶点2颜色——红色
  const color3 = new THREE.Color(0x0000ff) // 顶点3颜色——蓝色
  geometry.colors.push(color1, color2, color3)

  // 点渲染模式
  const material = new THREE.PointsMaterial({
    vertexColors: THREE.VertexColors, // 以顶点颜色为准
    size: 10.0 // 点对象像素尺寸
  }) // 材质对象Material
```

### 2.6 Face3对象定义Geometry的三角形面

```javascript
  // 立方体网格模型
  const geometry = new THREE.Geometry() // 声明一个几何体对象Geometry
  // 类型数组创建顶点数据
  const p1 = new THREE.Vector3(0, 0, 0) // 顶点1坐标
  const p2 = new THREE.Vector3(0, 100, 0) // 顶点2坐标
  const p3 = new THREE.Vector3(50, 0, 0) // 顶点3坐标
  const p4 = new THREE.Vector3(0, 0, 100) // 顶点4坐标
  // 顶点坐标添加到geometry对象
  geometry.vertices.push(p1, p2, p3, p4)

  // Face3构造函数创建一个三角面
  const face1 = new THREE.Face3(0, 1, 2)

  // 三角面每个顶点的法向量
  const n1 = new THREE.Vector3(0, 0, -1) // 三角面Face1顶点1的法向量
  const n2 = new THREE.Vector3(0, 0, -1) // 三角面2Face2顶点2的法向量
  const n3 = new THREE.Vector3(0, 0, -1) // 三角面3Face3顶点3的法向量
  // 设置三角面Face3三个顶点的法向量
  face1.vertexNormals.push(n1, n2, n3)
  // 三角形1颜色
  face1.color = new THREE.Color(0xffff00)
  // 设置三角面face1三个顶点的颜色
  face1.color = new THREE.Color(0xff00ff)

  // 三角面2
  const face2 = new THREE.Face3(0, 2, 3)
  // 设置三角面法向量
  face2.normal = new THREE.Vector3(0, -1, 0)
  face2.vertexColors = [
    new THREE.Color(0xffff00),
    new THREE.Color(0xff00ff),
    new THREE.Color(0x00ffff),
  ]

  geometry.faces.push(face1, face2)
```

### 2.7 访问几何体对象的数据

`Geometry`

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145241.png" alt="image-20200915145240593" style="zoom:80%;" />

`BufferGeometry`

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145329.png" alt="image-20200915145327160" style="zoom:80%;" />

### 2.8 几何体旋转、缩放、平移变换

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145406.png" alt="image-20200915145404865" style="zoom:80%;" />

## 3. 材质对象

### 3.1 常用材质对象

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145515.png" alt="image-20200915145514090" style="zoom:80%;" />

材质和模型对象对应关系

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145559.png" alt="image-20200915145559109" style="zoom:80%;" />

### 3.2 材质共有属性、私有属性

`.side`属性

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  // 前面FrontSide  背面：BackSide 双面：DoubleSide
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6
})
```

材质透明度

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x220000,
  // transparent设置为true，开启透明，否则opacity不起作用
  transparent: true,
  // 设置材质透明度
  opacity: 0.4,
});

// transparent设置为true，开启透明，否则opacity不起作用
material.transparent = true
// 设置材质透明度
material.opacity = 0.4
```

## 4. 点线面模型对象

### 4.1 点、线、网格模型介绍

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145853.png" alt="image-20200915145852878" style="zoom:80%;" />

### 4.2 模型对象旋转平移缩放变换

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915145948.png" alt="image-20200915145947808" style="zoom:80%;" />

### 4.3 对象克隆、复制

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915150049.png" alt="image-20200915150048205" style="zoom:80%;" />

## 5. 光源对象

### 5.1 光照原理和常见光源类型

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915150244.png" alt="image-20200915150241896" style="zoom:80%;" />

### 5.2 基类`Light`和`Object3D`

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915152941.png" alt="image-20200915152940805" style="zoom:80%;" />

## 6. 层级模型、树结构

### 6.1 组对象`Group`、层级模型

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915154540.png" alt="image-20200915154536830" style="zoom:80%;" />

Group案例

```javascript
  const geometry = new THREE.BoxGeometry(20, 20, 20)
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
  const group = new THREE.Group()
  const mesh1 = new THREE.Mesh(geometry, material)
  const mesh2 = new THREE.Mesh(geometry, material)
  mesh2.translateX(25)
  // 把mesh1型插入到组group中，mesh1作为group的子对象
  group.add(mesh1)
  // 把mesh2型插入到组group中，mesh2作为group的子对象
  group.add(mesh2)
  // 把group插入到场景中作为场景子对象
  scene.add(group)

  group.translateY(100) // 沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
  group.scale.set(4, 4, 4) // 父对象缩放，子对象跟着缩放
  group.rotateY(Math.PI / 6) // 父对象旋转，子对象跟着旋转
```

查看子对象`.children`

```javascript
  console.log('查看group的子对象', group.children)
```

场景对象结构

```javascript
  console.log('查看Scene的子对象', scene.children)
```

.add方法

```javascript
  group.add(mesh1,mesh2)
```

.remove方法

```javascript
  group.remove(mesh1)
```

### 6.2 对象节点命名、查找、遍历

模型命名

```javascript
group.add(Mesh)
// 网格模型命名
Mesh.name = "眼睛"
// mesh父对象对象命名
group.name = "头"
```

递归遍历方法`.traverse()`

```javascript
scene.traverse(function(obj) {
  if (obj.type === "Group") {
    console.log(obj.name);
  }
  if (obj.type === "Mesh") {
    console.log('  ' + obj.name);
    obj.material.color.set(0xffff00);
  }
  if (obj.name === "左眼" | obj.name === "右眼") {
    obj.material.color.set(0x000000)
  }
  // 打印id属性
  console.log(obj.id);
  // 打印该对象的父对象
  console.log(obj.parent);
  // 打印该对象的子对象
  console.log(obj.children);
})
```

查找某个具体的模型

```javascript
// 遍历查找scene中复合条件的子对象，并返回id对应的对象
var idNode = scene.getObjectById ( 4 )
console.log(idNode)
```

```javascript
// 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
var nameNode = scene.getObjectByName ( "左腿" )
nameNode.material.color.set(0xff0000)
```

### 6.3 本地位置坐标、世界位置坐标

`.getWorldPosition()`方法

```javascript
// 声明一个三维向量用来保存世界坐标
var worldPosition = new THREE.Vector3();
// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
mesh.getWorldPosition(worldPosition);
```

## 7. 几何体对象、曲线、三维建模

### 7.1 常见几何体和曲线`API`介绍

几何体

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915171040.png" alt="image-20200915170946756" style="zoom:80%;" />

曲线

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915171047.png" alt="image-20200915171028801" style="zoom:80%;" />

### 7.2 圆弧线绘制（直线、椭圆、圆弧、基类Curve）

### 7.3 样条曲线、贝塞尔曲线

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915173719.png" alt="image-20200915173717775" style="zoom:80%;" />

### 7.4 多个线条组合曲线CurvePath

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915182233.png" alt="image-20200915182232769" style="zoom:80%;" />

### 7.5 曲线路径管道成型

### 7.6 旋转成型

### 7.7 Shape对象和轮廓填充ShapeGemoetry

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200915190044.png" alt="image-20200915190041511" style="zoom:80%;" />

### 7.8 拉伸扫描成型

## 8. 纹理贴图

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200916114126.png" alt="image-20200916114125178" style="zoom:80%;" />

### 8.1 创建纹理贴图

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200916141538.png" alt="image-20200916141537848" style="zoom:80%;" />

### 8.2 几何体顶点纹理坐标UV

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200916141925.png" alt="image-20200916141924494" style="zoom:80%;" />

### 8.3 数组材质、材质索引

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200916150643.png" alt="image-20200916150641205" style="zoom:80%;" />

### 8.4 纹理对象Texture(阵列、偏移、旋转)

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200916162304.png" alt="image-20200916162303297" style="zoom:80%;" />

### 8.5 canvas画布、视频作为纹理贴图

### 8.6 凹凸贴图`bumpMap`和法线贴图`.normalMap`

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200917084352.png" alt="image-20200917084351463" style="zoom:80%;" />

### 8.7 光照贴图添加阴影

### 8.8 高光贴图

### 8.9 环境贴图

### 8.10 数据纹理对象

## 9. 相机对象

### 9.1 正投影和透视投影相机

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200917140008.png" alt="image-20200917140006806" style="zoom:80%;" />

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200917140617.png" alt="image-20200917140615787" style="zoom:80%;" />

正投影相机对象[OrthographicCamera](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/OrthographicCamera)

```javascript
/**
 * 正投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

```javascript
// 构造函数格式
OrthographicCamera( left, right, top, bottom, near, far )
```

| 参数(属性) | 含义                                                         |
| :--------- | :----------------------------------------------------------- |
| left       | 渲染空间的左边界                                             |
| right      | 渲染空间的右边界                                             |
| top        | 渲染空间的上边界                                             |
| bottom     | 渲染空间的下边界                                             |
| near       | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1 |
| far        | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值1000 |

透视投影相机[PerspectiveCamera](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/PerspectiveCamera)

```javascript
/**
 * 透视投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

```javascript
// 构造函数格式
PerspectiveCamera( fov, aspect, near, far )
```

| 参数   | 含义                                                         | 默认值                               |
| :----- | :----------------------------------------------------------- | :----------------------------------- |
| fov    | fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度 | 45                                   |
| aspect | aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比 | window.innerWidth/window.innerHeight |
| near   | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 | 0.1                                  |
| far    | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到 | 1000                                 |

### 9.2 窗口变化自适应渲染

## 10. 精灵模型、粒子系统

### 10.1 精灵模型对象Sprite

### 10.2 中国城市PM2.5可视化案例

### 10.3 精灵模型[Sprite](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Sprite)模拟树林效果

### 10.4 精灵模型[Sprite](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Sprite)模拟下雨效果

## 11. 帧动画模块

### 11.1 编辑关键帧并解析播放

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200918165223.png" alt="image-20200918165214896" style="zoom:80%;" />

### 11.2 解析外部模型的帧动画

### 11.3 播放设置（暂停、时间段、时间点）

## 12. 骨骼动画、变形动画

### 12.1 骨骼动画原理

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200921103152.png" alt="image-20200921103143419" style="zoom:80%;" />

### 12.2 加载外部模型骨骼动画

### 12.3 变形目标动画原理

### 12.4 解析外部模型变形目标数据

## 13. 语音模块

### 13.1 音频与场景关联（音源、监听者）

### 13.2 音乐可视化

## 14. 模型文件加载

<img src="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/20200922104744.png" alt="image-20200922104742954" style="zoom:80%;" />

### 14.1 Three.js数据结构、导入导出

### 14.2 加载STL文件并解析

### 14.3 加载OBJ文件（几何体、材质、贴图）

### 14.4 加载FBX并解析骨骼动画

### 14.5 手镯在线预览（商品展示）

### 14.6 心脏预览（法线、高光、环境贴图）

## 15. WebGL渲染器

### 15.1 场景渲染结果网页局部显示