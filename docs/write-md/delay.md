```typescript
type resolving<P = any> = (res: P) => void

function delay<P extends any[], T extends (...args: P) => any = () => null>
    (func: T, seconds: number = 0, ...args: P): Promise<ReturnType<T>> {
    let _resolve: resolving<ReturnType<T>>
    let _reject: resolving
    setTimeout(() => {
        try {
            _resolve(func(...args))
        } catch(e) {
            _reject(e)
        }

    }, seconds)
    return new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })
}
```
