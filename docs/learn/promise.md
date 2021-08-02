Promise 3组我觉得最重要的内部的属性 

    1.Capability Record
    2.Reaction Record
    3.Promise

PromiseCapability Records

    [[Promise]]	object 	    promise
    [[Resolve]]	function	resolve promise的方法
    [[Reject]]	function	reject promise的方法

PromiseReaction Records	

    [[Capability]]	PromiseCapability Records or undefined
    [[Type]]        Fulfill | Reject 类型
    [[Handler]]     JobCallback Record | empty	

Promise
    
    [[PromiseState]] 			状态
    [[PromiseResult]]			结果
    [[PromiseFulfillReactions]]	fulfill对应的响应
    [[PromiseRejectReactions]]	reject对应的相响应
    [[PromiseIsHandled]]		是否存在reaction

最重要的几个API我认为就是`new` `Resolve Function` `then` `NewPromiseReactionJob` `NewPromiseResolveThenableJob`
这里只是展示部分逻辑用于梳理Promise的最重要的逻辑

#### new 做了什么

    1.创造了promise携带初始化的5个参数 
    2.创造了[[Resolve]] [[Reject]]俩方法(就是capability里面的那俩)
    3.调用executor([[Resolve]], [[Reject]])
    4.返回promise
    其实new做的内容并不多也很简单，核心的内容也不再这里

#### Resolve Function 做了什么
    
    只分两类第一类直接RejectPromise 或者FulfillPromise 最后都是 到了NewPromiseReactionJob
    第二类带有then可以调用的对象 调用NewPromiseResolveThenableJob

#### then 做了什么
    
    then有两个参数onFulfilled和onRejected
    创建Capability Record
    创建executor executor里面其实就是把传入的函数绑到Capability上面
    直接走new的流程
    创建Reaction 就是设置上创建的Capability 把onFulfilled封成job callback放在[[Handler]]
    基于Handle设置不同Type 然后扔到调用then的promise的对应Reaction上去

#### NewPromiseReactionJob job是什么内容
    
    其实这里主要就是创建了function 然后在event loop中调用
    以fulfill为例其实就是 reactions.promise.resolve(onFulfill(PromiseResult))
    

#### NewPromiseResolveThenableJob job是什么内容
    
    这里简单来说就是给传入的promise增加个then

其实主要的流程还是很简单的 哎 感觉文字就是很苍白 

描述一下就是一个promise[[Resolve]]调起来会变更promise的状态 然后遍历对应状态的Reaction里面的数据去调NewPromiseReactionJob

如果[[Resolve]]发现是个带then的就创建个NewPromiseResolveThenableJob任务就是在后面加个then(这里会给把[[Resolve]][[Reject]] 变成新的 因为这上面有个有没有调用的参数 调用就不能再调了)
