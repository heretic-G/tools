其实原本是按照lodash实现的 但是这里有个差异是如果属性存在就返回其实没有把目标元素是`undefined`的时候设置回default

```javascript

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

```
