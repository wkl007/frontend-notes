### 第十二章 Java运行环境配置

### 1. Java安装

```
yum search java|grep jdk
sudo yum -y install java-1.8.0-openjdk*
```

### 2. Tomcat安装

官网：http://tomcat.apache.org/

```
scp或xshell复制到服务器~目录
解压 tomcat
/tomcat/bin    sh version.sh

启动tomcat
/tomcat/bin     sh startup.sh

//设置nginx转发
server {
   listen       80;
   server_name  192.168.2.111;
   location / {
       proxy_pass http://192.168.2.111:8080;
   }
}
```

### 3. Maven安装

官网：http://maven.apache.org/

```
/maven/bin      mvn -v

添加到环境变量
udo ln -s ~/maven/bin/mvn /usr/bin/mvn
```

### 4. Tomcat和Nginx配合


