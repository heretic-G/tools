为啥Object.create(null) 没有 后来还发现只要设置成__proto__为null也不存在了
这个问题刚开始真的是一脸懵B 找到答案之后真的是....

其实一直只是存在一个__proto__ 就是Object.prototype.__proto__ 其他的都是这个的映射 而你在控制台打印一个obj 出来的__proto__其实就是一个展示上面的处理

首先__proto__ 只存在 Object.prototype.__proto__ 里面 而且 es7 已经 不让改Object的 [[Prototype]]
An immutable prototype exotic object is an exotic object that has an immutable [[Prototype]] internal slot.


[[Prototype]] 只能设置Object和null


`__proto__`  是 accessor property 他正常都是返回[[Prototype]] 然后set的时候是正常的 不过get可能会存在意外 当Object不在链上的时候会导致返回undefined 因为本质__proto__ 不存在非Object的里面 规范流程在这里不属于这个对象的属性 [[Prototype]]还是null 那就返回undefined，仔细一想也对 原型链没了 又不是这个对象的属性就是undefned呗 我们可以使用Object.defineProperty(obj, '__proto__', {value: 3})
这个时候在chrome展开对象 发现里面__proto__ 还是指向Object的 来确定这里确实是展示处理 只要这条链存在Object.prototype.__proto__ 那就是在每个对象里面加上这玩意 不论这个对象有没有这个属性

具体的一些流程看看规范就清楚了 其实没啥难度 主要是以前一直有个概念是对象存在__proto__这玩意的 其实都是调用的别人的set get 再加上浏览器的展示处理导致 发现的时候有种三观崩溃的感觉

