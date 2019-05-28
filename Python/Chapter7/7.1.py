# a = 1.123456
# b = round(a, 2)
# print(b)
# help(round)

"""
1.参数列表可以没有
2.return value

"""


# import sys

# 设置最大递归次数
# sys.setrecursionlimit(1500)


def add(a, b):
    # 形式参数
    return a + b


def print_info(code):
    print(code)


# 实际参数
a = add(1, 2)
b = print_info('what the fuck')
print(a, b)
