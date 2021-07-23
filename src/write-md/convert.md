实现十进制转二进制 
二进制转十进制


```javascript

function convert (num) {
    let negative = false
    let int
    let float
    let intBinary = ''
    let floatBinary = ''

    if (num < 0) {
        negative = true
        num = -num
    }

    num += ''

    let point = num.indexOf('.')
    if (point > -1) {
        int = num.slice(0, point)
        float = '0' + num.slice(point)
    } else {
        int = num
    }
    if (int) {
        int = +int
        while (int >= 1) {
            intBinary = int % 2 + intBinary
            int = int / 2 | 0
        }
    }
    if (float) {
        let index = -1
        let accuracy = 0
        while (float && accuracy < 19) {
            let temp = Math.pow(2, index) + ''
            let max = Math.max(temp.length, float.length)
            if (temp.length < max) {
                temp += '0'.repeat(max - temp.length)
            }
            if (float.length < max) {
                float += '0'.repeat(max - float.length)
            }
            if (temp === float) {
                floatBinary = floatBinary + 1
                break
            }
            if (temp > float) {
                floatBinary = floatBinary + 0
            } else {
                floatBinary = floatBinary + 1
                let initFloat = +float.slice(2)
                let initTemp = +temp.slice(2)
                float = String(initFloat - initTemp)
                float = `0.${'0'.repeat(max - float.length - 2)}${float}`
            }
            accuracy += 1
            index -= 1
        }
    }
    return `${negative ? '-' : ''}${intBinary}${floatBinary ? `.${floatBinary}` : '' }`
}

```
