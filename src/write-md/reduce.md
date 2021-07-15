```javascript

Array.prototype.reduce = function reduce (fun, init) {
    const length = this.length
    let result
    let start
    if (typeof fun !== 'function') {
        throw new TypeError('is not fun')
    }
    if (length === 0 && init === undefined) {
        throw new TypeError('')
    }
    if (init !== undefined) {
        result = init
        start = 0
    } else {
        for (let i = 0; i < length; i++) {
            if (this.hasOwnProperty(i)) {
                result = this[i]
                start = i + 1
                break
            }
        }
        if (start === undefined) {
            throw new TypeError('')
        }
    }

    for (let i = start; i < length; i++) {
        if (this.hasOwnProperty(i)) {
            result = fun(result, this[i], i, this)
        }
    }
    return result
}
```