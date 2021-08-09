

我是基于原型继承的方式 实现 

其实更好的是使用obj 直接

    {
        data: data,
        option: method
    }

这样的话 其实直接存在this  但是看别人实现过了 所以换个方式 

这里遇到一个问题就是不分Array的api其实会造成返回的数组是新的
这些行为会导致原有生成的原型继承方法会丢失 需要从新的封装 感觉这里是个坑 需要注意
```javascript
const data = [
    {userId: 8, title: 'title1'},
    {userId: 11, title: 'other'},
    {userId: 15, title: null},
    {userId: 19, title: 'title2'}
];

// 查找data中，符合where中条件的数据，并根据orderBy中的条件进行排序
const result = find(data).where({
    "title": /\d$/   // 这里意思是过滤出数组中，满足title字段中符合 /\d$/的项
}).orderBy('userId', 'desc');  // 这里的意思是对数组中的项按照userId进行倒序排列

function find (data) {
    const temp = Array.isArray(data) ? [...data] : {...data}
    let opt = {
        where: function where (opt) {
            return find(Object.entries(opt).reduce((prev, [key, match]) => {
                return prev.filter(curr => {
                    return match.test(curr[key])
                })
            }, this))
        },
        orderBy: function order (key, type) {
            return this.sort((prev, next) => {
                switch (type) {
                    case 'desc':
                        return next - prev
                    case 'asc':
                        return prev - next
                    default:
                        return prev - next
                }
            })
        }
    }
    Object.setPrototypeOf(opt, Array.prototype)
    Object.setPrototypeOf(temp, opt)
    return temp
}


```
