希望不可枚举和Symbol 可以Reflect.ownKeys(obj).map(curr => obj[curr]) 获取全部的key对应的values
Object上面也有 不过是分开的 两个API


```javascript

function checkObj (obj, set = new Set()) {
    if (typeof obj === 'object' && obj !== null || Array.isArray(obj)) {
        if (set.has(obj)) {
            return true
        } else {
            set.add(obj)
        }
        return Object.values(obj).some(curr => {       
            return checkObj(curr, set)
        })
    }
    return false
}

```
