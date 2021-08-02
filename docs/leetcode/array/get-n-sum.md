
n数之和 这里使用回溯加剪枝 找不到更好的方式...

也看到一种是n-2的双指针 感觉也差不多 其实差距不大 只是最后少了两层的递归流程 其实在空间应该还是省了不少的

```javascript

function fun (arr, n, sum) {
    let result = []
    if (arr.length < n) return -1
    arr.sort((prev, next) => {
        return prev - next
    })
    function getSum (arr, n, currSum, index, incArr = []) {
        for (let i = index; i < arr.length; i++) {
            let temp = currSum + arr[i]
            if (temp > sum) break
            
            if (n > 1) {
                getSum(arr, n - 1, temp, i + 1, [arr[i], ...incArr])
            }

            if (n === 1 && temp === sum) {
                result.push([arr[i], ...incArr]) 
            }
        }
    }
    getSum(arr, n, 0, 0)
    return result
}

```
