### 第九章 缓存服务

查看进程：ps -ef |grep xxx

### 1. Memcached基本操作

```
安装：yum install memcached
启动：memcached -d -l -m -p
停止：kill pid
```

### 2. Redis基本操作

```
安装：源码编译安装
启动：redis-server start/restart
停止：redis-server stop
客户端：redis-client
```

### 3. Redis扩展知识

Redis不仅仅支持简单的key/value类型的数据，同时还提供list,set,hash等数据结构的存储
Redis支持数据的备份，即master-slave模式的数据备份
Redis支持数据的持久化，可以将内存中的数据保持在磁盘中
重启的术后可以再次加载进行使用

### 4. 检测端口是否联通

```
telnet
yum install telnet.*

telnet 127.0.0.1 80
```



