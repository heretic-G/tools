函数 方法 箭头函数在创建后的差异是什么




方法
    有[[HomeObject]] 对象方法、没有继承 Object.prototype的对象 null是null 不然就是superclass.prototype
    [[ThisMode]] => global | strict
    没有[[constructor]]
    单独自己不能包含 SuperCall
    单独自己可以包含 NewTarget, SuperProperty
    [[Prototype]] 2种 一种是Function.prototype 如果是constructor并且是继承的就是用superclassRef
    有arguments

函数
    [[HomerObject]] undefined
    [[ThisMode]] => global | strict
    有[[constructor]]
    单独自己不能包含 SuperProperty, SuperCall
    单独自己可以包含 NewTarget
    [[Prototype]] Function.prototype
    有arguments

箭头函数
    [[HomerObject]] undefined
    [[ThisMode]] => lexical
    没有[[constructor]]
    单独自己不能包含 NewTarget, SuperProperty, SuperCall
    [[Prototype]] Function.prototype
    无arguments 引用外部(具体arguments 可以看function的初始化的流程看看怎么创建的)





