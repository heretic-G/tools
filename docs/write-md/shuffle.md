

随机生成一个字符串 这玩意目前看洗牌最容易 


```javascript

function sample (length) {
    let arr = Array(100).fill(1).map((_, i) => i / 10 | 0)
    return shuffle(arr, length)
}

function notSample (length) {
    let arr = Array(10).fill(1).map((_, i) => i)
    return shuffle(arr, length)
}

function shuffle (arr, length) {
    let index = 0
    while (index < length) {
        let changeIndex = arr.length - 1 - index
        let randomIndex = Math.round(Math.random() * (changeIndex - 1))
        let temp = arr[changeIndex]
        arr[changeIndex] = arr[randomIndex]
        arr[randomIndex] = temp
        index += 1
    }
    return arr.slice(arr.length - length).join('')
}

```
