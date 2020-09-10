(function () {
  const arr = [1, 2, 3, 4]

  const arr1 = new Array(7)

  const arr2 = new Array(7).fill(6)

  // for循环
  const len = arr2.length
  for (let i = 0; i < len; i++) {
    console.log(arr2[i], i)
  }

  // forEach方法
  arr2.forEach((item, index) => {
    console.log(item, index)
  })

  // map方法
  const newArray = arr2.map((item, index) => {
    console.log(item, index)
    return item + 1
  })

  // 如果没有特殊的需要，那么统一使用 for 循环来实现遍历。因为从性能上看，for 循环遍历起来是最快的。
})()

(function () {
  // 初始化一个矩阵
  const arr = (new Array(7))
  const length = arr.length
  for (let i = 0; i < length; i++) {
    // 将数组的每一个坑位初始化为数组
    arr[i] = [1, 2, 3, 4, 5]
  }

  // 矩阵访问
  // 缓存外部数组的长度
  const outerLen = arr.length
  for (let i = 0; i < outerLen; i++) {
    // 缓存内部数组的长度
    const innerLen = arr[i].length
    for (let j = 0; j < innerLen; j++) {
      console.log(arr[i][j], i, j)
    }
  }

  // 一维数组用 for 循环遍历只需一层循环，二维数组是两层，三维数组就是三层。依次类推，N 维数组需要 N 层循环来完成遍历。
})()
