
使用add完成arr的累加 其实最简单就是串行promise 然后处理

这里是个二分+递归的处理

```javascript

function add (a, b) {
    return Promise.resolve(a + b)
}

function sum (arr) {
    if (arr.length <= 2) {
        return add(arr[0] || 0, arr[1] || 0)
    }
    let mid = arr.length / 2 | 0
    let promiseArr = []
    for (let i = 0; i < mid; i++) {
        promiseArr.push(add(arr[i], arr[mid + i]))
    }
    return Promise.all(promiseArr).then(res => {
        if (arr.length % 2 !== 0) {
            res.push(arr.pop())
        }
        return sum(res)
    })
}

```
