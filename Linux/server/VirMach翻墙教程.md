## VirMach翻墙教程

[VirMach官网](https://billing.virmach.com)

建议选择该[服务器](https://billing.virmach.com/cart.php?a=confproduct&i=0)，一年10美元。

### 服务器端配置

#### 安装

Debian/Ubuntu:

```sh
apt-get install python-pip
pip install shadowsocks
```

CentOS:

```shell
yum install python-setuptools && easy_install pip
pip install shadowsocks
```

#### 配置

找个地方放`shadowsocks`的配置文件，我选择放到 `/etc/shadowsocks`下面：

```shell
vim /etc/shadowsocks/shadowsocks.json
```

```json
{
  "fast_open": true,
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "method": "aes-256-cfb",
  "password": my_server_password,
  "server": my_server_ip,
  "server_port": my_server_port,
  "timeout": 300,
  "workers": 1
}

```

把

- `my_server_ip`改为自己的服务器IP或0.0.0.0
- `my_server_port`改为自己的服务器端口
- `my_server_password`改为自己的密码
- `method`的值改为自己的加密方式，一般是`aes-256-cfb`或者`rc4-md5`

详细配置说明：

| Name          | 说明                                                         |
| :------------ | :----------------------------------------------------------- |
| server        | 服务器地址，填ip或域名                                       |
| local_address | 本地地址                                                     |
| local_port    | 本地端口，一般1080，可任意                                   |
| server_port   | 服务器对外开的端口                                           |
| password      | 密码，可以每个服务器端口设置不同密码                         |
| port_password | server_port + password ，服务器端口加密码的组合              |
| timeout       | 超时重连                                                     |
| method        | 默认: “aes-256-cfb”，见 [Encryption](https://github.com/shadowsocks/shadowsocks/wiki/Encryption) |
| fast_open     | 开启或关闭 [TCP_FASTOPEN](https://github.com/shadowsocks/shadowsocks/wiki/TCP-Fast-Open), 填true / false，需要服务端支持 |

保存退出就配置好啦！

#### 配置开机自动启动

编辑`shadowsocks`服务的启动脚本文件，内容如下：

```sh
vim /etc/systemd/system/shadowsocks.service
```

```shell
[Unit]
Description=Shadowsocks Client Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/sslocal -c /etc/shadowsocks/shadowsocks.json

[Install]
WantedBy=multi-user.target
```

执行以下命令启动`shadowsocks`服务：

```shell
systemctl enable shadowsocks

systemctl start shadowsocks
```

检查`shadowsocks`服务是否已成功启动，可以执行以下命令查看服务的状态：

```shell
systemctl status shadowsocks -l
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713174815640.png)

若服务器防火墙开启，则需要开放对应端口，不然客户端是无法连接的：

```shell
firewall-cmd --zone=public --add-port=端口/tcp --permanent

firewall-cmd --reload
```

到此服务器端配置完成。

### 配置客户端

我这里配置的是windows的客户端，挺方便的，点击即用，不需要安装。

Windows客户端下载地址：

> https://github.com/shadowsocks/shadowsocks-windows/releases

Mac客户端下载地址：

> https://github.com/shadowsocks/ShadowsocksX-NG/releases

Android客户端下载地址：

> https://github.com/shadowsocks/shadowsocks-android/releases
