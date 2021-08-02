

```javascript
// 其实原本是按照lodash实现的 但是这里有个差异是如果属性存在就返回其实没有把目标元素是`undefined`的时候设置回default
function get (arm, params = '', defaultVal) {
    if (typeof params !== 'string' && !Array.isArray(params)) {
        throw new Error(`${params} is not string or array`)
    }
    if (!Array.isArray(params)) {
        params = params.split(/\].|[\[.]/)
    }
    for (let i = 0; i < params.length; i++) {
        if (Object.prototype.hasOwnProperty.call(arm, params[i])) {
            arm = arm[params[i]]
        } else {
            return defaultVal
        }
    }
    return arm
}

function get (obj, keyStr, defVal = undefined) {
    let matchArr = Array.from(keyStr.matchAll(/(\[).*?(\])|(?<=\.).*?(?=\.)|(?<=\.).*?$/g))
    let val = obj
    for (let i = 0; i < matchArr.length; i++) {
        if (typeof val === 'object' && val !== null || typeof val === 'function') {
            let key = matchArr[i][0]
            if (key[0] === '[') {
                key = key.slice(1, key.length - 1)
            }
            val = obj[key]
        } else {
            return defVal
        }
    }
    if (val === undefined) {
        return defVal
    } else {
        return val
    }
}

```


```typescript

type strToPoint<S> =
    S extends `${infer F}["${infer M}`  ? strToPoint<`${F}.${M}`> :
        S extends `${infer F}"]${infer M}`  ? strToPoint<`${F}${M}`> :
            S extends `${infer F}['${infer M}`  ? strToPoint<`${F}.${M}`> :
                S extends `${infer F}']${infer M}`  ? strToPoint<`${F}${M}`> :
                    S extends `${infer F}[${infer M}`  ? strToPoint<`${F}.${M}`> :
                        S extends `${infer F}]${infer M}`  ? strToPoint<`${F}${M}`> : S

type strPointToArr<S, A extends string[] = []> =
    S extends `${infer F}.${infer M}`  ? strPointToArr<M, [...A, F]> :
        S extends '' ? A : [...A, S]


type getReturnType<O extends unknown, K extends string[], D extends unknown = undefined> =
    K extends [] ? O extends undefined ? D : O :
        O extends Record<string, any> ? getReturnType<K[0] extends keyof O ? O[K[0]] : undefined, K extends [first:infer F, ...args: infer L] ? L : [] ,D > :
            D

let obj = {
    a: [1, 'lisi', {
        b: {
            c: 4
        },
        f: {
            g: 'wangwu'
        }
    }]
} as const

type get<O extends Record<string, any>, K extends string, Def extends unknown = undefined> =
    (obj: O, keyStr: K, defVal: Def) => getReturnType<O, strPointToArr<strToPoint<K>>, Def>


type zz = get<typeof obj, 'a[2][b].c', '123'>
type zzz = get<typeof obj, 'd[e]', 'defaultVal'>

```
