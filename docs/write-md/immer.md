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

proxy 的逻辑的 暂时未完成 裂开 

```javascript

function isObject (data) {
    if (typeof data === 'object' && data !== null) {
        return true
    }
}

const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

function createProxy (parent, base) {
    let data = {
        base: base,
        parent: parent,
        copy: undefined,
        drafts: {}
    }

    return Proxy.revocable(data, {
        get(obj, prop) {
            if (obj.copy) {
                let value = obj.copy[prop]
                if (value && isObject(value)) {
                    let proxy = createProxy(obj, value)
                    obj.drafts[prop] = proxy.proxy
                }
                return obj.drafts[prop]
            }
            if (obj.drafts[prop]) {
                return obj.drafts[prop]
            }
            let value = obj.base[prop]
            if (value && isObject(value)) {
                let proxy = createProxy(obj, value)
                obj.drafts[prop] = proxy.proxy
            }
            return obj.drafts[prop]
        },
        set(obj, prop, value) {
            if (!obj.copy) { createCopy(obj)}
            obj.copy[prop] = value
        },
        ownKeys(state) {
            return Reflect.ownKeys(state.copy ?? state.base)
        },
        getOwnPropertyDescriptor(state, prop) {
            const owner = state.copy ??
            has(state.drafts, prop) ? state.drafts : state.base
            return Reflect.getOwnPropertyDescriptor(owner, prop)
        }
    })
}

function createCopy (data) {
    if (!data.copy) {
        data.copy = Array.isArray(data.base) ? [...data.base] : {...data.base}
    }
    Object.assign(data.copy, data.drafts)
    if (data.parent) {
        createCopy(data.parent)
    }
}

function produce (state, producer) {
    let proxy = createProxy(undefined, state)
    producer(proxy.proxy)
    console.log(getResult(proxy.proxy))
}

function getResult (proxy) {
    let key = Object.keys(proxy)
    let result = Array.isArray(proxy.copy ?? proxy.base) ? [] : {}
    if (key.length === 0) {
        console.log(proxy, key)
    }

    key.forEach((curr) => {
        result[curr] = getResult(proxy[curr])
    })
    return result
}

produce({a: {b: {d: '大大'}}}, function (proxy) {
    proxy.a.b.d = '123123123'
})


```
