chrome以前在对静态资源缓存的时候直接使用静态资源的url当做cache key

这玩意有问题就是在另一个页面加载一个资源 你可以根据是否缓存了资源来知道是不是这个用户访问过特定网络

还有俩一个是跨站点搜索攻击和跨站点跟踪 没有理解

所以浏览器使用了一个新的规则去生成cache key 叫做Scheme://eTLD + 1

也就是协议+顶级域名+1层的逻辑 不在乎端口和子域名

对于iframe嵌套 只在乎top和引用的那一层

也就是 a.com -> b.com -> c.com 是 [a.com, c.com, url]

也就是 a.com -> d.com -> c.com 是 [a.com, c.com, url] 

上述两个后面会命中前面的缓存 

再补充个same origin 和same site的区别 site就是 eTLD + 1 而same origin就是协议 hostname port 都要相同 


跨域就是origin 的判断 具体跨域 还需要单独开一个介绍


