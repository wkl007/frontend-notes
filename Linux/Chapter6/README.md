## 第六章 Linux常用命令讲解

### 1. 软件操作命令

软件包管理器：yum

    安装软件：yum install xxx
    卸载软件：yum  remove xxx
    搜索软件：yum search xxx
    清理缓存：yum clean packages
    列出已安装：yum list
    软件包信息：yum info xxx

### 2. 服务器硬件资源和磁盘操作

    内存：free -m
    磁盘：df -h
    负载：w/top
    cup个数和核数:cat /proc/cpuinfo
    命令操作磁盘详解--添加、删除、转换分区:fdisk

### 3. 文件和文件夹操作命令

Linux文件的目录结构
        根目录/
        家目录/home
        临时目录/tmp
        配置目录/etc
        用户程序目录/usr

    文件基本操作命令
        ls      查看目录下的文件
        touch   新建文件
        mkdir   新建文件夹
        cd      进入目录
        rm      删除文件和目录 rm -r xxx||rm -rf xxx 删除文件夹
        cp      复制
        mv      移动
        pwd     显示路径
    
    文本编辑神器Vim
        yum install vim
    
        新建打开文件：vim xxx
        插入内容：i
        保存退出：:wq
        移入行首：gg
        移入行位：G
        删除：dd
        恢复：u
        复制：yy p
        退出：esc键
    
    文件权限 421
        r   4
        w   2
        x   1
    
    文件搜索，查找，读取
    
        find
    文件压缩与解压
        tar 命令
    
        压缩：tar -cf demo.tar demo   tar -czf demo.tar.gz
        解压：tar -xf demo.tar        tar -xzvf demo.tar.gz
### 4. 系统用户操作命令

添加用户：useradd xxx
添加用户：adduser xxx
删除用户：userdel xxx
更改密码：passwd xxx

### 5. 防火墙相关设置

保护服务器安全
设置防火墙规则
     开放80,22,443端口
关闭防火墙

    安装：yum install firewalld
    启动:service firewalld start
    检查状态：service firewalld status
    关闭或禁用防火墙:service firewalld stop/disable
    
    firewall-cmd

### 6. 提权操作sudo和文件传输协议



    提权：sudo
            1.root账号执行visudo
            2.修改
                %wkl    ALL=(ALL)   ALL
            3.普通账号执行命令sudo xxx
     文件下载：
            wget、curl   
            wget http://www.baidu.com
            curl -o baidu.html http://www.baidu.com
    
    文件上传：scp
        上传：scp demo.txt wkl@192.168.1.123:/temp
        下载: scp wkl@192.168.1.123:/temp/demo.txt ./
    
        windows下：
            yum install lrzsz
    
            上传：rz
            下载：sz
    
    shutdown -h now 立即关机
    shutdown -r now 立即重启
