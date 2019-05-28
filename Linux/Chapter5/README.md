### 第五章 SSH

#### 1. SSH是什么

secure Shell 安全外壳协议
建立在应用层基础上的安全协议
可靠，专为远程登录回话和其他网络服务提供安全性的协议
有效防止远程管理中的信息泄密问题
SSH客户端适用于多种平台
SSH服务器几乎支持所有UNIX平台

#### 2. 服务器安装SSH服务

#### 1. 安装SSH

```
yum install openssh-server
```

#### 2. 启动SSH

```
service sshd start
ps -ef |grep ssh
```

#### 3. 设置开机运行

```
chkconfig sshd on
```

#### 3. 客户端安装SSH客户端

##### 1. Windows平台

Xshell 6.0

##### 2. Linux平台

```
yum install openssh-clients
```

#### 4. SSH客户端连接服务器

ssh root@192.168.0.105

#### 5.SSH config用法详解

##### 1. config

config为了方便我们批量管理多个ssh
config存放在/etc/ssh/ssh_config
config配置语法

    touch config
    
    vim config
    
    host wkl
        HostName 192.168.0.105
        User root
        Port 22
    host wkl2
        HostName 192.168.0.105
        User root
        Port 22
    
    quit 退出  exit 退出

#### 6. 免密码登录方案之SSH Key

ssh key使用非对称加密方式生成公钥与私钥

    私钥存放在本地
    
    公钥可以对外公开，放在服务器的 ~/.ssh/
    
    1.touch authorized_keys
    2.将保存在本地的文件内容复制粘贴到该文件中
    3.用户身份验证：Public Key  root ssh_centos_key

#### 7. SSH端口安全

端口安全指的是尽量避免服务器的远程连接端口被不发分子知道，为此而改变默认服务器端口号的操作

    修改端口
    /etc/ssh/sshd_config
    
    service sshd restart
