
简易的template方法

```javascript

const template = '你好，{{ info.name.value }} 今天是{{ day.value }}'

let data = {
    info: {
        name: {
            value: '张三'
        }
    },
    day: {
        value: '7月20号'
    }
}

function render (template, data) {
    return template.replace(/({{).*?(}})/g, function (...args) {
        return Function(`return this.${args[0].slice(2, -2).trim()}`).call(data)
    })
}
render(template, data)
```