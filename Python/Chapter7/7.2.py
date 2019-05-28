def damage(skill1, skill2):
    damage1 = skill1 * 3
    damage2 = skill2 * 2 + 10
    return damage1, damage2


result1, result2 = damage(1, 2)
print(result1, result2)

# 序列解包
a, b, c = 1, 2, 3

d = 1, 2, 3

a1, b1, c1 = d
print(a1, b1, c1)

# 链式赋值
a2 = b2 = c2 = 1
print(a2, b2, c2)
