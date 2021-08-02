统计一个数字在排序数组中出现的次数。

...嗯 就遍历一次呗...


```javascript
var search = function(nums, target) {
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            sum += 1
        }
    }
    return sum
};
```
