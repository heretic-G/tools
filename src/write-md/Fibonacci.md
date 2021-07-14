```javascript

// 最基本的递归
function Fibonacci (n) {
    if (n === 0) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2)
}

// 尾递归优化
function Fibonacci (n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {
        return ac2
    }
    return Fibonacci(n - 1, ac2, ac1 + ac2)
}

```

```javascript
// 这里其实应该算是dp

function Fibonacci (n) {
    let arr = [0, 1]
    for (let i = 2; i < n + 1; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n]
}
// 空间优化
function Fibonacci (n) {
    let prev = 0
    let next = 1
    for (let i = 2; i < n + 1; i++) {
        if (i % 2 === 0 ) {
            prev += next
        } else {
            next += prev
        }
    }
    return n % 2 === 0 ? prev : next
}

```
