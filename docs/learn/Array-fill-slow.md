数组里面是分成两种的

Fast Elements(FixedArray)

    传统线性存储

Dictionary Elements HashTable

    Dictionary类 集成Hash-Table类
    hash表存储


然后快慢切换的话 快切慢逻辑多一些


分3种情况 (修改langth 是不会触发这个逻辑的 但是会触发更新capacity的逻辑)


创建大于(或者改变长度) kMaxFastArrayLength 32 * 1024 * 1024 的长度就直接是慢了 为什么是这个数


// This constant is somewhat arbitrary. Any large enough value would work.

从注释看是....就要求就是大一些 然后就定个这 具体更详细的信息 不清楚了 代码中是这样注释的

然后第二种就是使用index的时候index大于当前长度大于kMaxGap 1024 就直接切换成慢

还有第三种就是最后ShouldConvertToSlowElements 最后的判断逻辑 (这里的逻辑我不确定正确 如果你发现我存在错误 请告诉我 不胜感激)


ShouldConvertToSlowElements
在进入第三种计算前 需要先计算new_capacity 就是old*1.5 + 16


如果你的new_capacity 小于等于500没戏了就
如果大于500 小于等于5000 并且不是在年轻代中(Young Generation 这里应该就是垃圾回收中的年轻代的概念)

那你就可以进入第三个逻辑判断

这里比较了 size_threshold <= new_capacity
size_threshold计算逻辑我这边 自己理解是
已经存在的数组里面除了hole的个数


`>>` 到0 的num 然后(Math.pow(2, num) - 1) * 4 * 3  只要比他小都可以
举个例子 let arr = Array(1000).fill(1)
这个时候想要他变成慢 因为 1000 >> 10 -> 0
(Math.pow(2, 10) - 1) * 3 * 4 = 12276
只要小于这个长度都没事 大于就会导致转换到慢


....忘了 还有慢切换快 慢切快就是 所有的站位数

`>>` 到0 的num 然后Math.pow(2, num) * 4 * 3 只要比他小都可以
