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
