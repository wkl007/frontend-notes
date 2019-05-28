[TOC]

## 第二章 Nginx场景实践篇

### 1.静态资源WEB服务

#### 1.静态资源类型

非服务器动态运行生成的文件
浏览器渲染   HTML、CSS、JS
图片        JPEG、GIF、PNG
视频        FLV、MPEG
文件        TXT等任意下载文件

#### 2. 静态资源服务场景-CDN

#### 3. 配置语法

##### 1. sendfile

```
Syntax:sendfile on | off;
Default:sendfile off;
Context:http,server,location,if in location
```

引读：————with-file-aio 异步文件读取

##### 2. tcp_nopush

```
Syntax:tcp_nopush on | off;
Default:tcp_nopush off;
Context:http,server,location
```

作用：sendfile开启的情况下，提高网络包的传输效率

##### 3. tcp_nodelay

```
Syntax:tcp_nodelay on | off;
Default:tcp_nodelay on;
Context:http,server,location
```

作用：keepalive连接下，提高网络包的传输实时性

##### 4. gzip

```
Syntax:gzip on | off;
Default:gzip on;
Context:http,server,location,if in location
```

作用：压缩传输

##### 5. gzip_comp_level

```
Syntax:gizp_comp_level level;
Default:gizp_comp_level 1;
Context:http,server,location
```

作用：压缩比率

##### 6. gzip_http_version 1 | 1.1

```
Syntax:gzip_http_version 1 | 1.1;
Default:gzip_http_version 1.1;
Context:http,server,location
```

作用：http版本设置

#### 4. 扩展Nginx压缩模块

    http_gzip_static_module 预读gzip功能
    http_gunzip_module      应用支持gunzip的压缩方式

#### 5. 浏览器缓存

HTTP协议定义的缓存机制(如：Expires;Cache-control)

校验过期机制
校验是否过期               Expires、Cache-Control(max-age)
协议中Etag头信息校验        Etag
Last-Modified头信息校验    Last-Modified

配置语法 - expires
添加Cache-control、Expires头

```
Syntax:expires [modified] time;
               expires epoch | max | off;
Default:expires off;
Context:http,server,location,if in location
```

#### 6. 跨站访问

```
Syntax:add_header name value [always];
Default:————
Context:http,server,location,if in location
Access-Control-Allow-Origin
```

#### 7. 防盗链

目的：防止资源被盗用

思路：区别哪些请求是非正常的用户请求

 基于http_refer防盗链配置模块

```
Syntax:valid_referers none | blocked | server_names | string ...;
Default:————
Context:server,location
```

    gzip_types text/plain text/css text/javascript application/javascript text/xml application/xml application/xml+rss application/json image/jpeg image/gif image/png;

### 2. 代理服务

代理——代为办理（代理理财、代理收货等等）

正向代理代理的对象是客户端
反向代理代理的对象是服务端

#### 1. 配置语法

```
Syntax:proxy_pass URL;
Default:————
Context:location,if in location,limit_except

location ~ /test_proxy.html$ {
     proxy_pass http://127.0.0.1:8080;
}

http://localhost:8000/uri/
https://192.168.1.1:8000/uri/
http://unix:/tmp/backend.socket:/uri/
```

netstat -ntlp 查看端口

#### 2. 访问限制

```
location / {
            if($http_x_forwarded_for !~* "^116\.62\.103\.228"){
                return 403;
            }
            root /opt/app/code;
            index index.html index.htm;
}
```

#### 3. 正向代理设置

```
resolver 8.8.8.8; #DNS解析
location / {
     proxy_pass http://$http_host$request_uri;
}
```

#### 4. 代理配置语法补充

缓冲区

```
Syntax:proxy_buffering on |off;
Default:proxy_buffering on;
Context:http,server,location
        
```

作用：减少io损耗

扩展：proxy_buffer_size、proxy_buffers、proxy_busy_buffers_size

 跳转重定向

```
Syntax:proxy_redirect default;
proxy_redirect off;proxy_redirect redirect replacement;
Default:proxy_redirect default;
Context:http,server,location
```

头信息

```
Syntax:proxy_set_header field value;
Default:proxy_set_header Host $proxy_host;
             proxy_set_header Connection close;
Context:http,server,location
```

扩展：proxy_hide_header、proxy_set_body

超时

```
Syntax:proxy_connect_timeout time;
Default:proxy_connect_timeout 60;
Context:http,server,location
```

扩展：proxy_read_timeout、proxy_send_timeout

#### 5. 常用配置项

```
 location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_redirect default;

        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_connect_timeout 30;
        proxy_send_timeout 60;
        proxy_read_timeout 60;

        proxy_buffering on;
        proxy_buffer_size 32k;
        proxy_buffers 4 128k;
        proxy_busy_buffers_size 256k;
        proxy_max_temp_file_size 256k;
}
```

### 3. 负载均衡调度器

配置语法

```
Syntax:upstream name {...}
Default:————
Context:http
```

