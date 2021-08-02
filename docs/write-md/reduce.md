
比想象中的reduce逻辑复杂很多 所以这里有个很重要的就是其实array的api很多时候并不在乎他是不是一个array

所以需要很多判断才能够在去调用

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
