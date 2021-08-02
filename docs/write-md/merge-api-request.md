
很基本的一个合并api请求  实际中肯定会复杂一些 其实逻辑也很简单 还有一种就是

直接缓存api的request的相同直接返回相同的promise 也是ok的

```javascript

let fetchMap = {

}

function createFetchKey (opt) {
    // 具体逻辑在业务中确立 只做基础demo
    return opt.url
}

function fetchUrl (opt) {
    let key = createFetchKey(opt)
    if (!fetchMap[key]) {
        fetchMap[key] = []
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve()
                } else {
                    reject()
                }
            }, 1000)
        }).then(res => {
            fetchMap[key].forEach(curr => {
                curr.resolve(res)
            })
        }, (res) => {
            fetchMap[key].forEach(curr => {
                curr.reject(res)
            })
        })
    }

    return  new Promise((resolve, reject) => {
        fetchMap[key].push({
            resolve,
            reject,
        })
    })
}

```