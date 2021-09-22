
其实这俩主要是生存周期的区别 都是同域

localStorage 是长期(具体时间按照实现方去定义)

sessionStorage的话 绝大多数都是同tabs 也就是一个tab打开是个新的 
但是如果存在opener这时候会复制opener的sessionStorage

相同tabs只要是存在过的就其实还会存在这时候history的里面也算是存在的

其实没啥好说的主要是记录下sessionStorage的生存周期

chrome session 早期错误[chrome 更新日志](https://developer.chrome.com/blog/deps-rems-89/#stop-cloning-sessionstorage-for-windows-opened-with-noopener)
