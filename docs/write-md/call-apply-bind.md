
如何模拟call 其实之前没有好的思想 直到看到了别人的一个想法直接扔到this上面去调用 不就好了吗 

仔细想 其实却是是一种思想 所以实现下

```javascript

Function.prototype.call = function call(arm, ...args) {
    let fun = this
    if (typeof fun !== 'function') throw TypeError('must is function')
    let armObj = arm
    if (typeof arm !== 'object') {
        armObj = Object(arm)
    }
    
    let symbolKey = Symbol('tempKey')
    armObj[symbolKey] = fun
    let result = armObj[symbolKey](...args)
    delete armObj[symbolKey]
    return result
}

Function.prototype.apply = function call(arm, ...args) {
    let fun = this
    if (typeof fun !== 'function') throw TypeError('must is function')
    let armObj = arm
    if (typeof arm !== 'object') {
        armObj = Object(arm)
    }

    let symbolKey = Symbol('tempKey')
    armObj[symbolKey] = fun
    let result = armObj[symbolKey](args)
    delete armObj[symbolKey]
    return result
}

// TODO 完善bind 这里其实还有很多问题
Function.prototype.bind = function aBind (that, ...args) {
    let armFun = this
    if (typeof armFun !== 'function') throw TypeError('must a function')
    function BoundFun (...other) {
        if (new.target) {
            return new armFun(...args, ...other)
        } else {
            return armFun.call(that,...args, ...other)
        }
    }
    BoundFun.__proto__ = armFun.__proto__
    BoundFun.prototype = undefined
    
    return BoundFun
}

```
