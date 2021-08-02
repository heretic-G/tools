
比较经典的双指针 寻找平衡点

因为平衡点只能是一个 所有使用双指针 左右缩到间隔一个点 然后看和是不是一样 一样返回left下一个 不然返回-1

```typescript

function findBalance(arr: number[]): number {
    let left = 0
    let right = arr.length - 1
    let leftSum = arr[left]
    let rightSum = arr[right]
    while (right - left > 2) {
        if (rightSum < leftV) {
            right -= 1
            rightSum += arr[right]
        } else {
            left += 1
            leftSum += arr[left]
        }
    }
    if (leftSum === rightSum) {
        return arr[left + 1]
    } else {
        return -1
    }
}
```
