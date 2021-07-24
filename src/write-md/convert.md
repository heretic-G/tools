实现十进制转二进制 
二进制转十进制


```javascript
// 这样处理是存在很高的精度问题 在写的时候陷入了js操作不可靠的问题 其实这里理解出现
// 问题 其实是浮点数存储限制 导致数存在精度丢失 但是在精度丢失后 我们是可以获取到存储的
// 全部精度的值 这里和展示是有区别的

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


```javascript
// 二进制转十进制

function binaryToDecimal (num) {
    let negative = false
    if (num < 0) {
        num = -num
        negative = true
    }
    num += ''
    let point = num.indexOf('.')
    let int
    let intDecimal = 0
    let float
    let floatDecimal = 0

    if (point > -1) {
        int = num.slice(0, point)
        float = `${num.slice(point + 1)}`
    } else {
        int = num
    }
    if(int) {
        for (let i = 0; i < int.length; i++) {
            intDecimal += int[int.length - i - 1] * Math.pow(2, i)
        }
    }

    if (float) {
        for (let i = 0; i < float.length; i++) {
            floatDecimal += float[i] * Math.pow(2, -(i + 1))
        }
    }
    let result = ''
    if (negative) {
        result += '-'
    }
    result += (intDecimal + floatDecimal)
    return +result
}

```


```javascript
// 十进制转二进制

function decimalToBinary (num) {
    let negative = false
    if (num < 0) {
        num = -num
        negative = true
    }
    num += ''
    let point = num.indexOf('.')
    let int
    let intBinary = ''
    let float
    let floatBinary = ''

    if (point > -1) {
        int = num.slice(0, point)
        float = Number(`0${num.slice(point)}`)
    } else {
        int = num
    }
    if(int) {
        int = +int
        while (int >= 1) {
            intBinary = int % 2 + intBinary
            int = int / 2 | 0
        }
    }

    if (float) {
        while(float) {
            float *= 2
            if (float >= 1) {
                floatBinary += 1
            } else {
                floatBinary += 0
            }
            float = float % 1
        }
    }
    let result = ''
    if (negative) {
        result += '-'
    }
    result += (`${intBinary || 0}.${floatBinary}`)
    return result
}

```


```javascript

// 一个转换科学计数到str-number的方法 没有完全测试全面过

function getFullNum(num){
    if(isNaN(num)) return num
    let str = '' + num
    if (/e-/i.test(str)) {
        let fixed = ('' + num).match(/\d+$/)[0]
        return `0.${'0'.repeat(fixed - 1)}${str.slice(0, str.indexOf(`e-${fixed}`)).replace('.', '')}`
    }
    if (/e+/i.test(str)) {
        let fixed = ('' + num).match(/\d+$/)[0]
        let int = str.slice(0, str.indexOf(`e+${fixed}`)).replace('.', '')
        return `${int}${'0'.repeat(fixed-int.length + 1)}`
    }
    return num
}
```
