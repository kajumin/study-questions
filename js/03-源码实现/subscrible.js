class Subscribe {
    constructor() {
        this.pond = []
    }
    add(fn) {
        let isExist = this.pond.some(item => item === fn)
        !isExist && this.pond.push(fn)
    }
    remove(fn) {
        const pond = this.pond
        this.pond.forEach((item, index) => {
            if(item === fn) {
                pond[index] = null
            }
        })
    }
    fire(...args) {
        const pond = this.pond
        for(let i = 0; i < pond.length; i++) {
            let item = pond[i]
            if(item === null) {
                pond.splice(i, 1)
                i--
                continue
            }
            item(...args)
        }
    }
}