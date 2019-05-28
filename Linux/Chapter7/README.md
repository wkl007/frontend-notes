## 第七章 WebServer安装和配置讲解

NGINX   APACHE

### 1.Apache基本操作

安装  yum install httpd
启动  service httpd start
停止  service httpd stop
重启  service httpd restart

### 2.Apache虚拟主机配置和及伪静态操作

/etc/httpd/
/etc/httpd/conf/httpd.conf

    修改vitrual
    <VirtualHost *:80>
        ServerName www.wkl.test
        DocumentRoot /data/www
        <Directory "/data/www">
            Options Indexes FollowSymLinks
            AllowOverride None
            Require all granted
            <IfModule mod_rewrite.c>
                RewriteEngine On
                RewriteRule ^(.*).htmp  & index.html
            </IfModule>
        </Directory>
    </VirtualHost>
    
    sudo chown -R wkl:wkl /data
    
    禁止访问    sudo setenforce 1
    可以访问    sudo setenforce 0
    
    伪静态：LoadModule rewrite_module modules/mod_rewrite.so

### 3.Nginx基本操作

安装  yum install nginx
启动  service nginx start | systemctl start nginx.service
停止  service nginx stop | systemctl stop nginx.service
重启  service nginx restart | systemctl restart nginx.service
重载  service nginx reload | systemctl reload nginx.service

    开机启动 sudo systemctl enable nginx
    
    1.nginx安装
    sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
    
    firewall-cmd --zone=public --permanent --add-port=80/tcp
    
    修改/etc/firewalld/zones/public.xml文件
    <port protocol="tcp" port="80"/>
    
    配置目录
    /etc/nginx/conf.d/default.conf
    
    日志目录
    /var/log/nginx
    
    sudo nginx -t
    
    netstat -ntlp |grep 8080
    
    查看nginx配置是否正确
    nginx -t
### 4.Nginx扩展知识

#### 1.反向代理

#### 2.负载均衡




