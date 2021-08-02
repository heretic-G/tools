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
