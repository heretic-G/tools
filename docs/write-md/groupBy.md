```javascript

function groupBy (data, filter) {
    const map = {}
    data.forEach(curr => {
        const key = filter(curr)
        if (!map[key]) map[key] = []
        map[key].push(curr)
    })
    return map
}

```