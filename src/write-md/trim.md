
去除两边空格

```javascript

function trim (str = '') {
    str = String(str)
    let left = 0
    let right = str.length - 1
    while (/\s/.test(str[left]) && left < right) {
        left += 1
    }

    while (/\s/.test(str[right]) && left < right) {
        right -= 1
    }
    return str.slice(left, right + 1)
}

function trim (str = '') {
    str = String(str)
    let left = 0
    let right = str.length - 1
    while (str[left] === ' ' && left < right) {
        left += 1
    }

    while (str[right] === ' ' && left < right) {
        right -= 1
    }
    return str.slice(left, right + 1)
}

function trim (str = '') {
    str = String(str)
    return str.replace(/^[ ]+|[ ]+$/g, '')
}


```
