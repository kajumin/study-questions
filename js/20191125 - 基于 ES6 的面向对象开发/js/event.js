class Event {
    constructor(){
        this.events = {};
    }
    // 添加相应的事件处理
    on(event,f){
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(f);
    }
    // 删除相应的事件处理
    off(event,f){
        if(this.events[event]){
            this.events[event] = this.events[event].filter(item=>f!=item);
        }
    }
    // 触发事件
    dispatch(event,...arg){
        if(this.events[event]){
            this.events[event].forEach(item => {
                item.call(this,...arg);
            });
        }
    }
}