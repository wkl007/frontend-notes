print('hello python')
# 条件控制

mood = True

if mood:
    print('go to left')
else:
    print('go to right')

a = 1
b = 2
if a > b:
    print('go to left')
else:
    print('go to right')

# ACCOUNT = 'wkl'
# PASSWORD = '123456'

# print('请输入账号')
# USER_ACCOUNT = input()
#
# print('请输入密码')
# USER_PASSWORD = input()
#
# if ACCOUNT == USER_ACCOUNT and PASSWORD == USER_PASSWORD:
#     print('success')
# else:
#     print('fail')

# snippet 片段

a = True

if a:
    # 空语句/占位语句
    pass
else:
    pass

counter = 0

# 递归
# while counter < 10:
#     counter += 1
#     print(counter)
# else:
#     print('程序终结')

# for循环主要用来遍历/循环序列、集合、字典
# a = [['apple', 'orange', 'banana', 'grape'], (1, 2, 3)]
# for x in a:
#     for y in x:
#         if y == 'orange':
#             break
#         print(y, end=' ')
# else:
#     print('遍历结束')

# a = [1, 2, 3]
#
# for x in a:
#     if x == 2:
#         # break
#         continue
#     print(x)

a = [1, 2, 3, 4, 5]

for x in range(10, 0, -2):
    print(x, end=' | ')

b = [1, 2, 3, 4, 5, 6, 7]

for x in range(0, len(b), 2):
    print(b[x], end=' | ')

c = b[0:len(b):2]
print(c)
