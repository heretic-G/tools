
```javascript
// 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
// 例如110000000000000000000000000000000000000000000000
// 也就是对应00:00~01:00这个时间区间


function timeBitmapToRanges (str) {
    function convertBitToTime (bitIndex) {
        let hour = bitIndex / 2 | 0 
        let min = bitIndex % 2 !== 0 ? '30' : '00'
        return `${hour < 10 ? `0${hour}` : min}:${min}`
    }
    
    let timeArr = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '1') {
            let next = i + 1
            while(str[next] === '1') {
                next += 1
            }
            timeArr.push(`${convertBitToTime(i)}~${convertBitToTime(next)}`)
            i = next + 1
        }
    }
    return timeArr
}

```
