function MyPromise (executor) {
    if (typeof executor !== 'function') {
        // throw new Error('Promise resolver 1 is not a function')
    }
    if (this instanceof MyPromise) {
        // throw new Error(`${this} is not a promise`)
    }
    this.PromiseState = 'pending'
    this.PromiseFulfillReactions = []
    this.PromiseRejectReactions = []
    this.PromiseIsHandled = false
    this.AlreadyResolved = false

    let resolve = _Resolve(this)
    let reject = _Reject(this)

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    let promise = this
    let capability = NewPromiseCapability()
    return PerformPromiseThen(promise, onFulfilled, onRejected, capability)
}

function _Resolve (promise) {
    return function __Resolve (resolution) {
        if (promise.AlreadyResolved) {
            return undefined
        }
        promise.AlreadyResolved = true
        if (resolution === promise) {
            return RejectPromise(promise, TypeError('is same'))
        }
        if ((typeof resolution !== 'function' && typeof resolution !== 'object') || resolution === null) {
            return FulfillPromise(promise, resolution)
        }
        let then
        try {
            then = resolution.then
        } catch (e) {
            return RejectPromise(promise, e)
        }
        if (typeof then !== 'function') {
            return FulfillPromise(promise, resolution)
        } else {
            let job = NewPromiseResolveThenableJob(promise, resolution, then)
            HostEnqueuePromiseJob(job)
        }
        return undefined
    }
}

function _Reject (promise) {
    return function __Reject (reason) {
        if (promise.AlreadyResolved) {
            return undefined
        }
        promise.AlreadyResolved = true
        RejectPromise(promise, reason)
    }
}

function executor (resolve, reject) {
    this.resolve = resolve
    this.reject = reject
}

function NewPromiseCapability () {
    let capability = {
        resolve: undefined,
        reject: undefined,
        promise: undefined
    }
    capability.promise = new MyPromise(executor.bind(capability))
    return capability
}

function PerformPromiseThen (promise, onFulfilled, onRejected, resultCapability) {
    let fulfillReaction = {
        Capability: resultCapability,
        Type: 'Fulfill',
        Handler: onFulfilled
    }
    let rejectReaction = {
        Capability: resultCapability,
        Type: 'Reject',
        Handler: onRejected
    }
    if (promise.PromiseState === 'pending') {
        promise.PromiseFulfillReactions.push(fulfillReaction)
        promise.PromiseRejectReactions.push(rejectReaction)
    } else if (promise.PromiseState === 'fulfilled') {
        let resolution = promise.PromiseResult
        let job = NewPromiseReactionJob(fulfillReaction, resolution)
        HostEnqueuePromiseJob(job)
    } else {
        if (!promise.PromiseIsHandled) {

        }
        let reason = promise.PromiseResult
        let job = NewPromiseReactionJob(rejectReaction, reason)
        HostEnqueuePromiseJob(job)
    }
    promise.PromiseIsHandled = true
    if (!resultCapability) return undefined
    return resultCapability.promise
}

function FulfillPromise (promise, resolution) {
    if (promise.PromiseState !== 'pending') {
        return undefined
    }
    let reactions = promise.PromiseFulfillReactions
    promise.PromiseResult = resolution
    promise.PromiseRejectReactions = []
    promise.PromiseFulfillReactions = []
    promise.PromiseState = 'fulfilled'
    TriggerPromiseReactions(reactions, resolution)
}

function RejectPromise (promise, reason) {
    if (promise.PromiseState !== 'pending') {
        return undefined
    }
    let reactions = promise.PromiseRejectReactions
    promise.PromiseResult = reason
    promise.PromiseRejectReactions = []
    promise.PromiseFulfillReactions = []
    promise.PromiseState = 'rejected'
    if (!promise.PromiseIsHandled) {

    }
    TriggerPromiseReactions(reactions, reason)
}

function TriggerPromiseReactions (reactions, argument) {
    reactions.forEach(curr => {
        let job = NewPromiseReactionJob(curr, argument)
        HostEnqueuePromiseJob(job)
    })
}

function NewPromiseReactionJob (reaction, argument) {
    return function () {
        let capability = reaction.Capability
        let type = reaction.Type
        let handler = reaction.Handler
        let handlerResult
        let isError = false
        if (typeof handler !== 'function') {
            if (type === 'Fulfill') {
                handlerResult = argument
            } else {
                isError = true
                handlerResult = argument
            }
        } else {
            try {
                handlerResult = handler(argument)
            } catch (e) {
                isError = true
                handlerResult = e
            }
        }
        if (!capability) return undefined
        let status
        if (!isError) {
            status = capability.resolve(handlerResult)
        } else {
            status = capability.reject(handlerResult)
        }
        return status
    }
}

function NewPromiseResolveThenableJob (promiseToResolve, thenable, then) {
    return function () {
        let resolve = _Resolve(promiseToResolve)
        let reject = _Reject(promiseToResolve)
        promiseToResolve.AlreadyResolved = false
        let result
        try {
            result = then.call(thenable, resolve, reject)
        } catch (e) {
            return reject(e)
        }
        return result
    }
}

function HostEnqueuePromiseJob (job) {
    setTimeout(job, 0)
}


MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = MyPromise

