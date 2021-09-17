setTimeout 

setInterval setTimeout是通的 可以互相调clear取消

当嵌套逻辑大于5 最小间隔是4ms

在睡眠或者tab不处于活动的时候 系统会提高setTimeout的最小间隔时间

chrome最小间隔 设置为1ms 


因为最小1ms的限制 所以我们可以用别的api实现0ms的task(这里的0是逻辑的没有系统最低限制的0ms 而不是真的就是间隔0ms)

使用 `postMessage`

```javascript
let count = 1

window.addEventListener("message", function () {

    console.timeEnd(String(count))

    if (count < 100) {
        count += 1

        console.time(String(count))
        window.postMessage('')
    }

}, false)

console.time(String(count))
window.postMessage('')

```

使用 `MessageChannel`

```javascript

let count = 1

const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

port1.onmessage = function(event) {

    console.timeEnd(String(count))
    if (count < 100) {
        count += 1
        console.time(String(count))
        port2.postMessage('')
    }
}

console.time(String(count))
port2.postMessage('')
```

第一次使用来模拟setTimeout的时候 发现耗时比setTimeout还长 所以这里代码都是100次 你会发现 第一次都是耗时会大于1ms或者有时会更高
(这里是猜测 估计在第一次连接后会建立一些参数或者数据 方便下次再连接 所以后面会稳定下来)

然后记录一个导致slow的原因就是如果利用这俩传输大数据的时候 会因为数据量增加导致耗时快速上升

所以在最开始设计的时候需要第一传输增量数据 第二使用buffer 或者直接使用SharedArrayBuffer(回单开一章学习下 总是听说自己还没体验过)

[postMessage变慢](https://surma.dev/things/is-postmessage-slow/)

tick

    node 优先队列
    RN 是优先队列
    Deno 是红黑树
    Chromium 是最大堆


[修复最小1ms间隔](https://groups.google.com/a/chromium.org/g/blink-dev/c/HKPTp7C1LwY/m/5Rl78YJfAwAJ)
