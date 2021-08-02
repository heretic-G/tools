
这里有个可以优化的就是includes 需要n 这里可以建立map 然后使用map在空间会多 但是时间能降下来很多

```javascript

function intersection (...args) {
    if (args.length === 0) return []
    for (let i = 0; i < args.length; i++) {
        if (!Array.isArray(args[i])) {
            args[i] = [args[i]]
        }
    }
    if (args.length === 1) return [...new Set(args[0])]
    let index = 1
    let sameArr = args[0]
    while (index < args.length) {
        let tempArr = []
        for (let i = 0;i < args[index].length; i++) {
            if (sameArr.includes(args[index][i])) {
                tempArr.push(args[index][i])
            }
        }
        sameArr = tempArr
        if (sameArr.length === 0) return []
    }
    return [...new Set(sameArr)]
}

```
