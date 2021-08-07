很简易的不可变数据

其实就是最简单的 在set的时候基于当前路径去设置新的对象或者数组 这样去处理 产生新的对象 
但是又能够最大限度的使用不变的数据

```javascript
function immer (obj) {
    let data = obj
    return {
        set: function (path, val) {
            let temp
            let currData = data
            let currTemp
            let exist = true
            const pathArr = path.split('.')
            for (let i = 0;i < pathArr.length; i++) {
                let next
                if (Array.isArray(currData)) {
                    next = [...currData]
                } else {
                    next = {...currData}
                }
                if (pathArr[i - 1]) {
                    currTemp[pathArr[i - 1]] = next
                    currTemp = next
                } else {
                    temp = currTemp = next
                }
                if (Object.prototype.hasOwnProperty.call(currData, pathArr[i])) {
                    currData = currData[pathArr[i]]
                } else {
                    exist = false
                }
            }
            if (exist) {
                currTemp[pathArr[pathArr.length - 1]] = val
            }
            return immer(temp)
        },
        get: function (path, def) {
            if (!path) return data
            const pathArr = path.split('.')
            return pathArr.reduce((prev, next) => {
                if (Object.prototype.hasOwnProperty.call(prev, next)) {
                    return prev[next]
                } else {
                    return undefined || def
                }
            }, data)
        }
    }
}
```
