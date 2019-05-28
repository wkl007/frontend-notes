### 1. 创建一大串级联目录

mkdir -p /test/test/demo.txt

### 2. 查询命令所在的绝对路径

which ls
查找文件
whereis ls
find [路径] [参数]

### 3. mv有重命名的作用

### 4. tac是cat的反序用法

### 5. 更改文件的权限

chgrp：更改文件的所属组  chgrp [组名]  [文件名]
chown：更改文件的所有者  chow (-R)   [账户名]   [文件名]
                            chow (-R)   [账户名]:[组名]   [文件名]
chmod:更改文件的权限     chmod (-R)    [xyz]   [文件名]
                            chmod 777 test
umask：改变文件的默认权限 umask (xxx)

### 6. Linux防火墙

#### 1. SELinux关闭

##### 1. 查看状态

​     getenforce

##### 2. 临时关闭

​     setenforce 0

##### 3. 永久关闭

​      /etc/selinux/config

​    SELINUX=disabled

##### 2. iptables

​    1.关闭
​        iptables -F

##### 3. firewalld






