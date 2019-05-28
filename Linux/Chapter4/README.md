### 第四章 准备工作

#### 1.查看ip

​    ifconfig
​    ip addr
​    vi /ect/sysconfig/network-scripts/ifcfg-xx
​    yum install net-tools

    ONBOOT=yes
    
    :wq 保存并退出
    
    service network restart

#### 2.替换默认源

桥接

    http://mirrors.163.com/.help/centos.html
    
    1.yum install wget
    2.mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
    3.cd /etc/yum.repos.d/
    4.wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
    5.yum clean all
      yum makecache

#### 3.安装Vim

    yum install vim
