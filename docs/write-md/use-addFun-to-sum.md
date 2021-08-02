
使用add完成arr的累加 其实最简单就是串行promise 然后处理

这里是个二分+递归的处理 做并发处理

```javascript

Promise.map = function (queue = [], opt = { }) {
    let limit = opt.limit || 5
    let queueIndex = 0
    let completeCount = 0
    let _resolve
    let result = Array(queue.length)

    for (let i = 0; i < limit; i++) {
        next(queueIndex++)
    }

    function next (index) {
        if (queue.length === 0) return
        let curr = queue.shift()
        if (typeof curr === 'function') {
            curr = curr()
        }
        Promise.resolve(curr).then((res) => {
            result[index] = res
        }, (res) => {
            result[index] = res
        }).finally(() => {
            completeCount += 1
            if (completeCount === result.length) {
                return _resolve(result)
            }
            next(queueIndex++)
        })
    }
    return new Promise((resolve) => {
        _resolve = resolve
    })
}

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
    return Promise.map(promiseArr).then(res => {
        if (arr.length % 2 !== 0) {
            res.push(arr.pop())
        }
        return sum(res)
    })
}

```
