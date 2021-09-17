没有想到更好的方法去实现

```javascript

function initLocalStorage () {
    localStorage.setItem = function (key, value, time = 1000) {
        const expiresTime = Date.now() + time * 1000
        const payload = {
            __data: value,
            __expiresTime: expiresTime,
        }
        Storage.prototype.setItem.call(localStorage, key, JSON.stringify(payload))
    }
    localStorage.getItem = function (key) {
        const value = Storage.prototype.getItem.call(localStorage, key)
        if (typeof value === 'string') {
            const jsonVal = JSON.parse(value)
            if (jsonVal.__expiresTime) {
                if (jsonVal.__expiresTime >= Date.now()) {
                    return JSON.stringify(jsonVal.__data)
                } else {
                    return null
                }
            }
        }
        return value
    }
}
initLocalStorage()

```
