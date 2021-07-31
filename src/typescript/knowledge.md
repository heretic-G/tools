记录一些遇到的情况和笔记

一个很有意思的图 [图片地址](https://gist.github.com/laughinghan/31e02b3f3b79a4b1d58138beff1a2a89)


[地址2](https://github.com/microsoft/TypeScript/issues/33025)

```typescript
// ts中 所有人都是值得集合 只有一个人例外 就是never

// 一个有意思的问题 为什么keyof never是 string | number | symbol
// 在[地址2]中有讨论



// type zasd = { [K in never]: any } & { foo?: number } => {} & {foo?: number}
// 但是如果你用{} & {foo?:number} => {foo?: number}  而且第一个nb在可以string extends zasd 是true 没理解说实话


// 过滤可选属性 使用 {} extends { name?: string } 是会返回true的 
// 在最开始的ts提交这个属性 就存在过一个问题 就是一个{ name?: string } 不能设置name是undefined 只能进行删除 感觉那时候
// 类似于是{name: string} | {}
// 现在类似于{ name: string }| {name: undefined}| {}


//  {} | null | undefined

// 在[Key in Obj] 中 其实Key只能是一个key 但是我们可以改变Key的值使用as 使用as后可以让他基于新的去遍历

// 在val的设置中 经常去T[Key] 这里必须要Key 是T中的值 这里的要的含义是ts类型能够推断出 经常会丢失

// ``中设置变量 ${T} 这种 其实需要T 类型必须string | number | bigint | boolean | null | undefined 中的一种 这里有个简单的小技巧 其实只要 & 一个就可以

// ``中有一种遍历生成 这个也是我最近遇到的 如何生成一个 'a' | 'b' 变为 'aa' | 'ab' | 'bb' | 'ba' 只要 `${keyof T}${keyof T}` 就可以
// 这个应该是模板字符串会去处理的一个逻辑 但是具体的更详细还没理解 等后面理解更深刻在补充 

// 今天钻的一个牛角尖 一个数组的typeof 类型是number[] 所以在 1是可以符合


```


[查看地址](https://github.com/microsoft/TypeScript/issues/44520)
```typescript
// 无约束泛型 在传递到类型限制是{} 的时候不会报错 因为官方的{}定义为重要类型 所以他比null/undefined 更早这里匹配上了
// 但是在上面T中进行unknow 就可以限制这种行为 一个有意思的内部逻辑 具体可以看这里 上面的[查看地址]


function a (args: {}) {}

function b<T> (args: T) {
    a(args)
}

a(null)

```
