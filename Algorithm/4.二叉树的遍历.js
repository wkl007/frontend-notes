const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}

  // 二叉树先序遍历 根、左、右
  (function () {
    // 所有遍历函数的入参都是树的根结点对象
    function preorder (root) {
      // 递归边界，root 为空
      if (!root) return

      // 输出当前遍历的结点值
      console.log(root.val)
      // 递归遍历左子树
      preorder(root.left)
      // 递归遍历右子树
      preorder(root.right)
    }

    preorder(root)
  })()

  //二叉树中序遍历 左、根、右
  (function () {
    function inorder (root) {
      // 递归边界，root 为空
      if (!root) return

      // 递归遍历左子树
      inorder(root.left)
      // 输出当前遍历的结点值
      console.log(root.val)
      // 递归遍历右子树
      inorder(root.right)
    }

    inorder(root)
  })()

  //二叉树后序遍历 左、右、根
  (function () {
    function postorder (root) {
      // 递归边界，root 为空
      if (!root) return

      // 递归遍历左子树
      postorder(root.left)
      // 递归遍历右子树
      postorder(root.right)
      // 输出当前遍历的结点值
      console.log(root.val)
    }

    postorder(root)
  })()
