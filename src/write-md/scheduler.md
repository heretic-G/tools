从我的理解 总共就两种方式
一种是横向的类似滑动窗口的 开始创建限制数个task 然后不断结束后从active去调用
一种是纵向的 开始创建num个通道 然后里面不断的结束创建 结束创建

```javascript

function scheduler (num) {
    let queue = []
    let active = -1
    let resultArr = []
    let _resolve
    let _reject

    async function task () {
        while (active < queue.length - 1) {
            active += 1
            let index = active
            try {
                if (typeof queue[index] === 'function') {
                    resultArr[index] = await queue[index]()
                } else {
                    resultArr[index] = await queue[index]
                }
            } catch (e) {
                resultArr[index] = Promise.reject(e)
            }
        }
    }

    function start () {
        let concurrencyArr = []
        for (let i = 0; i < num; i++) {
            concurrencyArr[i] = task()
        }
        Promise.all(concurrencyArr).then(res => {
            _resolve(resultArr)
        })
    }

    function addTask (task) {
        if (!Array.isArray(task)) {
            task = [task]
        }
        queue.push(...task)
    }

    let resultPromise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })

    resultPromise.addTask = addTask
    resultPromise.start = start

    return resultPromise
}

```
