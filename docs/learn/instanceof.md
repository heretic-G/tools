其实我发现我还停留在很早的instanceof的概念
先来描述下这个是干什么 具体就是判断一个leftVal 是不是rightVal的实例通过@@hasInstance  如果没有@@hasInstance 那就看leftVal 的prototype是不是在rightVal 的prototype chain上面
@@hasInstance  这个方法就是Symbol.hasInstance 为key的方法 在Function.prototype

先简单介绍下规范
第一步就是rightVal是不是个obj或者fun 不是就error
获取Symbol.hasInstance方法
如果存在就传入leftVal 和rightVal 出来的结果转Boolean 这里fun存在肯定会出来一个结果
测试下rightVal 是不是函数 不是函数报错
判断leftVal 是不是对象 不是直接false
然后获取leftVal 的prototype
如果不是对象或者函数直接抛错
重复获取rightVal 的prototype 直到等于null或者俩相等 返回结果

规范基本大的流程就是这样这个还是比较好去用js去实现的

```javascript
function typeObj (val) {
    if ((typeof val === 'function' || typeof val === 'object') && val !== null) {
        return true
    } else {
        return false
    } 
}

function instanceOf (left, right) {
    if (!typeObj(right)) {
        throw new Error('error info')
    }
    let hasInstance = right[Symbol.hasInstance]
    if (hasInstance !== undefined && typeof hasInstance === 'function') {
        return !!hasInstance.call(right, left)
    } else {
        if (typeof right !== 'function') {
            throw new Error('error info')
        }
        if (!typeObj(left)) return false
        let proto = right.prototype
        if (!typeObj(proto)) throw new Error('error Info')
        let leftProto = left.prototype
        while (leftProto !== null) {
            if (leftProto === proto) return true
            leftProto = leftProto.prototype            
        }
        return false
    }
}
```

实现完并没有去测试过 不过这里其实有一个地方处理不了就是rightVal如果是个bind function 其实通过js是不能获取到之前的function 






