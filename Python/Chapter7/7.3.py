# 必须参数
# 关键字参数
# 默认参数

def add(a, b):
    # 形式参数
    return a + b


# 关键字参数
c = add(b=3, a=2)
print(c)


def print_student_files(name, college, gender='男', age='18'):
    print('我叫' + name)
    print('我今年' + age + '岁')
    print('我是' + gender + '生')
    print('我在' + college + '上学')


print_student_files('老王', '北大')
print_student_files('老黑', '清华')
