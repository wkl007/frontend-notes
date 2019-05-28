### 第三章 理解什么是写代码与Python的基本类型

​    本章详细介绍了Python的基本类型，包括整形、浮点型；10、8、2、16进制数的意义和转换关系；布尔类型；字符串与字符串常见运算操作

#### 1.Python基本数据类型

​    不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
​    可变数据（3 个）：List（列表）、Dict（字典）、Set（集合）。

    1.Number：数字(不可变数据)
        整数：int
        浮点数：float
        布尔类型：bool
        复数：complex
    
        其他语言：单精度(float),双精度(double)
        其他语言：short,int,long
    
        + - / // %  **
        /：除法，获取到的值为float
        //：整除，获取到的值为int
        %：取余
        **：乘方
    
        10进制，2进制，8进制，16进制
    
        2进制：0b开头
        8进制：0o开头
        16进制：0x开头
    
        进制转换：
        转换成二进制bin(xxx)
        转换成八进制oct(xxx)
        转换成十进制int(xxx)
        转换成十六进制hex(xxx)
    
    2.String：字符串(不可变数据)
        单引号：' 'let\'s go'
        双引号："
        三引号：'''或"""
    
        转译字符：无法“看见”的字符、与语言本身语法有冲突的字符
        \n  换行
        \r  回车
        \'  单引号
        \t  横向制表符
    
        例子print("hello \\n world")
    
        原始字符串：字符串前面添加一个r
    
        字符串的运算
        +   *3      []
    
        str = 'Runoob'
    
        print (str)          # 输出字符串
        print (str[0:-1])    # 输出第一个到倒数第二个的所有字符
        print (str[0])       # 输出字符串第一个字符
        print (str[2:5])     # 输出从第三个开始到第五个的字符
        print (str[2:])      # 输出从第三个开始的后的所有字符
        print (str * 2)      # 输出字符串两次
        print (str + "TEST") # 连接字符串
    
    3.List：列表(可变数据)
        列表的运算
        +   *3      []
    
        list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
        tinylist = [123, 'runoob']
    
        print (list)            # 输出完整列表
        print (list[0])         # 输出列表第一个元素
        print (list[1:3])       # 从第二个开始输出到第三个元素
        print (list[2:])        # 输出从第三个元素开始的所有元素
        print (tinylist * 2)    # 输出两次列表
        print (list + tinylist) # 连接列表
    
    4.Tuple：元组(不可变数据)
        元组的运算
        +   *3      []
    
        tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
        tinytuple = (123, 'runoob')
    
        print (tuple)             # 输出完整元组
        print (tuple[0])          # 输出元组的第一个元素
        print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
        print (tuple[2:])         # 输出从第三个元素开始的所有元素
        print (tinytuple * 2)     # 输出两次元组
        print (tuple + tinytuple) # 连接元组
    
        type((1)) class 'int'(元组与数学运算)
    
        type((1,)) class 'tuple'
    
    包含：3 in [1,2,3] =>True
    不包含：3 not in [1,2,3] =>False
    
    长度：len([1,2,3]) =>3
    
    最大值：max([1,2,3]) =>3    max('hello world') =>w
    
    最小值：min([1,2,3]) =>1    min('helloworld') =>d
    
    转换ascII码：ord('')
    
    5.Set：集合(可变数据)
        空集合 type(set()) class 'set'
    
        创建：
            parame = {value01,value02,...}
            set(value)
    
        集合的运算
            student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
    
            print(student)   # 输出集合，重复的元素被自动去掉
            len(student)长度
            # 成员测试
            if 'Rose' in student :
                print('Rose 在集合中')
            else :
                print('Rose 不在集合中')
    
            # set可以进行集合运算
            a = set('abracadabra')
            b = set('alacazam')
            print(a)
            print(a - b)     # a和b的差集
            print(a | b)     # a和b的并集
            print(a & b)     # a和b的交集
            print(a ^ b)     # a和b中不同时存在的元素
    
    6.Dict：字典(可变数据)(key,value对集合)
        type({})    class 'dict'
    
        字典的运算
        dict = {}
        dict['one'] = "1"
        dict[2]     = "2"
    
        tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}
    
        print (dict['one'])       # 输出键为 'one' 的值
        print (dict[2])           # 输出键为 2 的值
        print (tinydict)          # 输出完整的字典
        print (tinydict.keys())   # 输出所有键
        print (tinydict.values()) # 输出所有值