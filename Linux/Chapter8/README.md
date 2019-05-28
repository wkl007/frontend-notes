## 第八章 MySQL

### 1.MySQL基本操作

安装: yum install mysql-community-server
启动：service mysqld start/restart
停止：service mysqld stop

    1.CentOS7默认安装mariadb数据库
        yum remove mariadb-libs.x86_64
    2.下载Mysql源
        https://dev.mysql.com/downloads/repo/yum/
    
        wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
    3.安装源
        yum localinstall mysql57-community-release-el7-8.noarch.rpm
    4.安装MySQL
        yum install mysql-community-server
    5.查看默认密码
        cat /var/log/mysqld.log | grep password
    6.连接Mysql数据库
        mysql -uroot -p
        (password)
    7.设置密码
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
    
        mysql_secure_installation

### 2.MySQL扩展知识

    远程连接
    开启Genelog
    新增用户和权限操作
    忘记root密码怎么办

### 3.MySQL客户端工具

SQLyog
Navicat
HeidiSQL
Sequal Pro
phpMyadmin

### 4.基本命令

show databases;
use mysql;
show tables;