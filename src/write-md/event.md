
感觉是个事件或者是个发布订阅

```javascript

class Center {
    eventMap = {}
    on (event, fun) {
        this.#add(event, fun, 'on')
    }

    once (event, fun) {
        this.#add(event, fun, 'once')
    }
    
    #add (event, fun, type) {
        if (typeof fun !== 'function') throw new TypeError(`${fun} is not a function`)
        if (!event) throw new Error(`need type`)
        if (!this.eventMap[event]) {
            this.eventMap[event] = []
        }
        this.eventMap[event].push({
            event: fun,
            type: type
        })
    }

    emit (event, ...args) {
        if (this.eventMap[event]) {
            this.eventMap[event] = this.eventMap[event].filter(curr => {
                curr.data(...args)
                return curr.type !== 'once'
            })
        }
    }

    remove (event, fun) {
        if (this.eventMap[event]) {
            this.eventMap[event] = this.eventMap[event].filter(curr => {
                return curr.event !== fun
            })
        }
    }
}

```
