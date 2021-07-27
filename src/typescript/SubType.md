

这道题并不是 challenge里面的题目 当然也可能是存在的 但是我还没做到 

记录题目 [题目地址](https://www.typescriptlang.org/play?#code/PQKgUABBCMCc0QLQQMoFcBGAVAngBwFMJIlEzywSBiGiQDIzA7txJME2-QLO1AAOUCo5QYGDBo9QhYIAGkB52oAbnboF-FQA6mqTLkIRApcaB15UAhboCHlGYC45foIjrACtqBvHz4koYEMEphQEAPpPnL5xEAG8usDHcoEAPR64CHCGtKABd8IiEAXggAbxIAOwBDAFsCAC4IAGdQgCcASwSAcwBuEiSijIgEtBSMAlyygF9KADM0BIBjUPyAewTshQiAHiwAPgAKJNyirMykhJwASniwFrsQf0CXQQIciABhJKy9re2nYJswLKHCCdjq1KqAcmS05+EICqqAJgAGCBNJaUG7YCL3R5pTKvJ7PQHAuzAAACoSyiAIAA9CN10blcr1ctdbgQIW8XmSPl9Kpl-p8ThjofSIHCgbZbEA)


第一眼没有完成 之后也没有完成  看完题解 并不能理解  这里的问题是keyof 直接放在pick里面不成

只有通过泛型传递才可以 这是大佬指点迷津才有点感觉 泛型就是变量 这里其实声明的类型关系 然后基于实际情况做的逻辑推理导致的

所以就像是官方的第一个demo 泛型是什么是变量 可以传输进来的 它对应的是关系，所以这时候其实官方的第一个demo我才明白了 

还真是学习不透彻ToT

```typescript

function demo <T> (args: T): T {
    
}

```


```typescript
type T = {
  name: string;
  age: number;
}

function subType<U extends keyof T>(args: Pick<T, U>){}

/* _____________ Test Cases _____________ */

subType({ name: 'name', age: 20 })

subType({ name: 'name' })

//@ts-expect-error
subType({ name: 'name', age: 20, sex: 'sex ' })


```
