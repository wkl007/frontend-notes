[TOC]
## 第一章 Nginx基础篇

### 1. 学习环境

#### 1. 安装

```
 yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
 yum -y install wget httpd-tools vim
```

#### 2. 关闭防火墙

##### 1. SELinux关闭

查看状态`getenforce`
临时关闭`setenforce 0`
永久关闭`/etc/selinux/config`  `SELINUX=disabled`

##### 2. iptables

关闭 ` iptables -F`  ` iptables -t nat -F`

#### 3. 初始化目录

`cd /top;mkdir app download logs work backup`

### 2. Nginx是什么

Nginx是一个开源且高性能、可靠的HTTP中间件、代理服务。  

### 3. 常见的中间件服务

- HTTPD-Apache基金会
-  IIS-微软
-  GWS-Google

### 4. Nginx优势

#### 1.IO复用

#### 2.轻量级

1.功能模块少
 2.代码模块化

#### 3.CPU亲和

CPU亲和是一种把CPU核心和Nginx工作进程绑定方式，把每个worker进程固定在一个cpu上执行，减少切换cpu的cache miss，获取更好的性能。

#### 4.sendfile

### 5. Nginx快速搭建与基本参数使用

| 版本 |    |
| ---------------- | -------- |
|  Mainline version  | 开发版   |
|  Stable version  | 稳定版 |
|  Legacy version                |    历史版本      |

### 6. Nginx快速安装

#### 1. 添加yum资源库

```
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

#### 2. 安装

```
sudo yum -y install nginx
```

#### 3. firewalld添加80端口

```
firewall-cmd --zone=public --permanent --add-port=80/tcp
```

### 7. 基本参数使用

#### 1. 安装目录

```
/etc/logrotate.d/nginx      配置文件    Nginx日志轮转，用于logrotate服务的日志切割

/etc/nginx                             目录、配置文件 Nginx主配置文件
/etc/nginx/nginx.conf
/etc/nignx/conf.d
/etc/nignx/conf.d/default.conf

/etc/nginx/fastcgi_params   配置文件    cgi配置相关，fastcgi配置
/etc/nginx/uwsgi_params
/etc/nginx/scgi_params

/etc/nginx/koi-utf          配置文件    编码转换
/etc/nginx/koi-win
/etc/nginx/win-utf

/etc/nginx/mime.types       配置文件    设置https协议的Content-Type与扩展名对应关系

/usr/lib/systemd/system/nginx-debug.service 配置文件    用于配置出系统守护进程管理器管理方式
/usr/lib/systemd/system/nginx.service
/etc/sysconfig/nginx
/etc/sysconfig/nginx-debug

/usr/lib64/nginx/modules    目录  Nginx模块目录
/etc/nginx/modules

/usr/sbin/nginx             命令  Nginx服务的启动管理的终端命令
/usr/sbin/nginx-debug

/usr/share/doc/nginx-1.14.0
/usr/share/doc/nginx-1.14.0/COPYRIGHT
/usr/share/man/man8/nginx.8.gz
/var/cache/nginx            目录  Nginx的缓存目录
/var/log/nginx              目录  Nginx的日志目录
```

#### 2. 编译参数

```
Nginx -V
```

#### 3. Nginx基本配置语法

    /etc/nginx/nginx.conf 
    user                设置nginx服务的系统使用用户
    worker_processes    工程进度数
    error_log           nginx的错误日志
    pid                 nginx服务启动时候的pid
    
    events  worker_connections  每个进程允许最大连接数 10000
            use                 工作进程数
    
    http
       server
          listen  端口
          server_name 域名|端口
          location 路径
          error_page  错误页面
          location=/50x.html  错误页面路径

#### 4. Http请求

#### 5. Nginx日志

##### 1.日志类型

error_log
access_log

##### 2.log_format

Syntax:log_format name [escape=default|json] string ...;
Default:log_format combined "...";
Context:http

##### 3.Nginx变量

HTTP请求变量
arg_PARAMETER、http_HEADER、sent_http_HEADER
内置变量-Nginx变量
自定义变量-自己定义

### 6. Nginx模块讲解

```
Nginx官方模块
第三方模块
1.http_stub_status_module配置
            Syntax:stub_status;
            Default:————
            Context:server,location

            location /mystatus {
                stub_status;
            }
2.http_random_index_module配置(随机主页)
            Syntax:random_index on | off;
            Default:random_index off;
            Context:location

            location / {
                random_index on;
            }
3.http_sub_module配置
            Syntax:sub_filter string replacement;(HTTP内容替换)
            Default:————
            Context:http,serer,location

            Syntax:sub_filter_last_modified on | off(缓存相关)
            Default:sub_filter_last_modified off;
            Context:http,server,location

            Syntax:sub_filter_once on | off;(全局替换)
            Default:sub_filter_once on;
            Context:http,server,location

            location / {
                sub_filter 'wkl' 'WKL';
                sub_filter_once off;
            }
```

### 7. Nginx的请求限制

```
连接频率限制 - limit_conn_module
            Syntax:limit_conn_zone key zone=name:size;
            Default:————
            Context:http

            Syntax:limit_conn conn_zone number;
            Default:————
            Context:http,server,location

请求频率限制 - limit_req_module
            Syntax:limit_req_zone key zone=name:size rate=rate;
            Default:————
            Context:http

            Syntax:limit_req zone=name [burst=number] [nodelay];
            Default:————
            Context:http,server,location

        limit_conn_zone $binary_remote_addr zone=conn_zone:1m;
        limit_req_zone $binary_remote_addr zone=req_zone:1m rate=1r/s;

        location / {
            root /opt/app/code;
            #limit_conn conn_zone 1;
            #limit_req zone=req_zone burst=3 nodelay;
            #limit_req zone=req_zone burst=3;
            limit_req zone=req_zone;
            index index.html index.htm;
        }
ab压力测试工具
            ab -n 100 -c 10 http://test.com/
            其中－n表示请求数，－c表示并发数
```

### 8. HTTP协议的连接与请求

 HTTP 1.0    TCP不能复用
 HTTP 1.1    顺序性TCP复用
 HTTP 2.0    多路复用TCP复用

 HTTP请求建立在一次TCP连接基础上
一次TCP请求至少产生一次HTTP请求

### 9. Nginx的访问控制

```
基于IP的访问控制 - http_access_module
            Syntax:allow address | CIDR | unix: |all
            Default:————
            Context:http,server,location,limit_except

            Syntax:deny address | CIDR | unix: |all
            Default:————
            Context:http,server,location,limit_except

            局限性：
                方法1：采用别的HTTP头信息控制访问
                方法2：结合geo模块
                方法3：通过HTTP自定义变量传递

            access_mod.conf
                server {
                    listen 80;
                    server_name localhost;
                    location / {
                        root    /opt/app/code;
                        index index.html index.htm;
                    }
                    #location ~ ^/admin.html {
                    #    root    /opt/app/code;
                    #    deny 222.128.189.17;
                    #    allow all;
                    #    index index.html index.htm;
                    #}
                    location ~ ^/admin.html {
                        root    /opt/app/code;
                        allow 222.128.189.17;
                        deny all;
                        index index.html index.htm;
                    }
                }

基于用户的信任登录 - http_auth_basic_module
            Syntax:auth_basic string | off;
            Default:auth_basic off;
            Context:http,server,location,limit_except

            局限性：
                1：用户信息依赖文件方式
                2：操作管理机械，效率低下

            解决方案：
                1.Nginx结合LUA实现高效验证
                2.Nginx和LDAP打通，利用nginx-auth-ldap模块

            Syntax:auth_basic_user_file file;
            Default:auth_basic off;
            Context:http,server,location,limit_except

                location ~ ^/admin.html {
                    root    /opt/app/code;
                    auth_basic "Auth access test!input your password!";
                    auth_basic_user_file /etc/nginx/auth_conf;
                    index index.html index.htm;
                }

            htpasswd生成密码
```