这里主要学习两种一种是redux 一种是koa的
```javascript

function compose (...funArr) {
    return function (...args) {
        let result = args
        for (let i = 0;i < funArr.length;i++) {
            if (typeof funArr[i] === 'function') {
                result = [funArr[i](...result)]
            }
        }
        return result.length === 1 ? result[0] : result
    }
}

```
