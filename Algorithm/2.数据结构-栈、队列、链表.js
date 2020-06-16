(function () {
  // 头部添加
  const arr = [1, 2]
  arr.unshift(0)

  // 尾部添加
  arr.push(3)

  // splice 添加到数组任何位置
  arr.splice(1, 0, 3)

  // 头部删除
  arr.shift()

  // 尾部删除
  arr.pop()
})()

(function () {
  // 栈 后进先出 只使用pop和push完成增删的数组

  // 初始状态，栈空
  const stack = []

  // 入栈过程
  stack.push(1)
  stack.push(2)
  stack.push(3)
  stack.push(4)
  stack.push(5)

  // 出栈过程，栈不为空才执行
  while (stack.length) {
    // 单纯访问栈顶元素（不出栈）
    const top = stack[stack.length - 1]
    console.log(top)
    // 将栈顶元素出栈
    stack.pop()
  }

  console.log(stack)
})()

(function () {
  // 队列 push和shift完成增删的数组
  const queue = []
  queue.push(1)
  queue.push(2)
  queue.push(3)

  while (queue.length) {
    // 单纯访问队头元素（不出队）
    const top = queue[0]
    console.log(top)
    // 将队头元素出队
    queue.shift()
  }

  console.log(queue)
})()

(function () {
  // 链表
  function ListNode (val) {
    this.val = val
    this.next = null
  }

  const node1 = new ListNode(1)
  node1.next = new ListNode(2)

  // 如果目标结点本来不存在，那么记得手动创建
  const node3 = new ListNode(3)
  // 把node3的 next 指针指向 node2（即 node1.next）
  node3.next = node1.next
  // 把node1的 next 指针指向 node3
  node1.next = node3

  // 删除node3
  node1.next = node3.next
})()

// 链表的插入/删除效率较高，访问效率较低；数组的访问效率较高，而插入效率较低
