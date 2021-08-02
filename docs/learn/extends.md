继承的几个方式 很早看过 但是当时其实不理解 所以突然看到bind就来继续扫盲下补充下以前的知识

主要就是看下fun的几种继承的实现(不过过完 其实还是不是很清晰 尤其是原型式 和寄生 我的理解它更像是一种方式或者思路 而不是完全为了一个行为)

还有就是es6有了更好的方式去实现

先想下继承想要做什么 直接在已经存在的信息上面增加修改删除一些信息或者行为我的理解主要是为了复用

也就是Child继承Parent就是Child拥有Parent给他自己实例的所有属性和方法

`原型链继承` `借用构造函数` `组合继承`
`原型式继承` `寄生继承`  `寄生组合继承`

`class extends 继承`

```javascript
原型链继承

function Parent () {
    this.name = 'parent'
}
Parent.prototype.sayName = function () {
    return this.name
}

function Child () {}
Child.prototype = new Parent()

// 这里其实就是prototype.__proto__ ---> 实例Parent 实例Parent.__proto__ ---> Parent.prototype

// 那从结果上面 Child的实例 能够拥有Parent实例的方法和数据还能有prototype的方法和数据 
// 但是如果Parent实例的属性是个引用类型就会开始改同一个就是Parent实例的那一个 


```

```javascript

借用构造函数继承

引用公用其实就是只是用一个用例的原因

function Parent () {}
function Child (parentArgs) {
    Parent.call(this,...parentArgs)
}

// 这里只是一个简单的demo 这种方式其实需要把方法和属性都定义在Parent的实例上 但是会导致方法在Child中存在多份其实这里不需要这么多的导致了大量的浪费
// 还有一个就是Parent 其实返回值也要处理下 如果是别人的构造函数需要注意(当然不是说别人都是坏人的意思...)

```

```javascript

// 下一种就是结合起来的组合继承 也就是属性不希望公用或者别人更改使用借用的方式 然后方法还是prototype的方式

function Parent () {}
function Child (parentArgs) {
    Parent.call(this,...parentArgs)
}

Child.prototype = new Parent()

// 这样因为同名属性其实Parent的实例你是获取不到的(当然你可以删除 然后在依照原型链去get到)不会出现大家互相改的问题， 方法都是用一份


```

```javascript
原型式继承

// 不是用于new来实现继承 而是你想要吧一个对象变成公用的

function object (obj) {
    function F () {}
    F.prototype = obj
    return new F()
}

// 这时候新的返回对象的链上就增加一层 这一层就是你希望公用的 其实现在可以用Object.create


```

```javascript

寄生继承

function object (obj) {
    function F () {}
    F.prototype = obj
    return new F()
}

function create (obj) {
    let clone = object(obj)
    clone.say = function () {}
    return clone
}

// 寄生其实我也没太明白 看很多介绍就是一个思维逻辑 在原型式上面可以自己增加逻辑 

```
          

```javascript
寄生组合继承

function object (obj) {
    function F () {}
    F.prototype = obj
    return new F()
}

function create (superType, subType) {
    let prototype = object(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype;
}

// 组合其实就是调用的Parent次数2次 这里使用一个fun当做中转 然后在上面关联两边只需要一次 其实有一次是调用了一个空F
// 因为我们在那里只要的是prototype的数据 其实Parent 调不调不吃劲

```   
