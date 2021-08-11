setTimeout 

setInterval setTimeout是通的 可以互相调clear取消

当嵌套逻辑大于5 最小间隔是4ms

在睡眠或者tab不处于活动的时候 系统会提高setTimeout的最小间隔时间

chrome最小间隔 设置为1ms 

tick

    node 优先队列
    RN 是优先队列
    Deno 是红黑树
    Chromium 是最大堆


[修复最小1ms间隔](https://groups.google.com/a/chromium.org/g/blink-dev/c/HKPTp7C1LwY/m/5Rl78YJfAwAJ)
