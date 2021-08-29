记录问题

www 代表新发布前端地址 例如www.demo.com
wwwOld 代表早已经发布的前端地址 例如wwwOld.demo.com

api 代表接口地址 例如api.demo.com

HSTS

这个其实就是一个设置浏览器的参数 他只能在https中设置 在response中设置 Strict-Transport-Security

那浏览器会记录下来 然后在下一次访问时候如果是http会直接在客户端变为https在访问


重定向

300 服务端提供多种方法

301 302 永久临时 早期是不让改方法的但是大家后来实现就没按照规范 所以后来规范定义可能重定向后type和发送时不一致 所以后面重新定义了303 307 308

307 308 临时永久 不允许重定向后改变type

303 改变为get方法获取 不允许缓存 

304 未修改

305 需要使用代理


cors

更详细就不介绍了 基本就是同域判断  协议 域名 端口 (必须完全一致)

在进行请求的时候 浏览器会根据是不是简单请求有个差异 就是如果不是简单请求就会先发送一个option的预请求

preflight可以设置参数进行缓存 缓存后下一次不会再preflight去询问是否允许


当时问题场景就是因为www和api混用http和https导致的

但是这个混用可能不是开发者真的操作导致的 比如wwwOld已经用https访问过 所以他请求了api导致api也设置了HSTS

www上线后使用http访问(这里是因为我们并不强制使用https) 这时候会报错 我们在不同环境请求的api地址使用了// 协议跟随
但是api因为HSTS设置后 浏览器会有一个307的动作又因为基本所有请求都很难是一个简单请求 所以这时候都会触发preflight 

不过preflight有一个限制是不能重定向 这里浏览器会吧这两个动作合并起来发送 所以一定会出问题....

这里就导致 其实如果www和api会发生跨域时如果希望使用HSTS就必须要对http做强制的https重定向 不然就有可能出现这个问题

然后定位到问题后 我们尝试了不同www和api分别设置HSTS的效果 发现一个很有意思的行为 浏览器合并307和preflight还会和preflight是否存在缓存相关

场景就是www和api都清除HSTS然后请求这时候是可以的 因为http不能设置HSTS 只有http的preflight不会出问题 

然后wwwOld使用https访问 api设置HSTS这时候在请求www会发现 www在请求api的时候 原先合并的307和preflight这里会进行分别请求

也就是先进行307 在进行preflight 而且只有之前http下访问的www请求过并且设置了preflight缓存的接口会进行这种拆分行为 而没有请求过的还是会进行307和preflight合并 导致报错


