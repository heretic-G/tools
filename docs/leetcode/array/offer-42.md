输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

这里还卡了下 原本以为双指针 其实一个index就够了 往后遍历的时候前面是不是有意义其实主要看他是不是大于0

如果一个值得前面大于0就是对后面有益的 如果小于0就可以重置掉 需要注意的是小于0需要比下大小 怕全负数  全负数其实就是比大小了


```javascript

var maxSubArray = function(nums) {
    let index = 0
    let sum = 0
    let max = -Infinity
    while (index < nums.length) {
        let num = nums[index]
        sum += num

        if (sum < 0) {
            sum = 0
            max = Math.max(max, num)
        } else {
            max = Math.max(max, sum)
        }
        index += 1
    }
    return max
};


```
