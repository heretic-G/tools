
instanceof的逻辑判断就是现看方法 然后看__proto__

```javascript
function typeObj (val) {
    if ((typeof val === 'function' || typeof val === 'object') && val !== null) {
        return true
    } else {
        return false
    } 
}

function instanceOf (left, right) {
    if (!typeObj(right)) {
        throw new Error('error info')
    }
    let hasInstance = right[Symbol.hasInstance]
    if (hasInstance !== undefined && typeof hasInstance === 'function') {
        return !!hasInstance.call(right, left)
    } else {
        if (typeof right !== 'function') {
            throw new Error('error info')
        }
        if (!typeObj(left)) return false
        let proto = right.prototype
        if (!typeObj(proto)) throw new Error('error Info')
        let leftProto = left.prototype
        while (leftProto !== null) {
            if (leftProto === proto) return true
            leftProto = leftProto.prototype            
        }
        return false
    }
}
```
