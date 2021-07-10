class Drag extends Event {
    constructor(el){
        super();
        this.el = el;
        this.startMouse = {};
        let move = (e)=>{
            this.move(e);
        }
        this.el.addEventListener("mousedown",(e)=>{
            this.start(e);
            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",(e)=>{
                this.end(e);
                document.removeEventListener("mousemove",move);
            },{once:true});
        });
    }        
    start(e){
        this.startMouse = {
            x: e.clientX,
            y: e.clientY
        };
        this.dispatch("dragstart",e);
        /*
            拖拽：
                获取摁下时元素的坐标
            框选:
                创建一个元素用于画框    
        */
    }
    move(e){
        let nowMouse = {
            x: e.clientX,
            y: e.clientY
        };
        let dis = {
            x: nowMouse.x - this.startMouse.x,
            y: nowMouse.y - this.startMouse.y
        };
        this.dispatch("dragmove",{...e,type:"dragmove"},dis,nowMouse);
        /*
            拖拽：
                用摁下时元素的坐标 + 差值 计算 元素的当前值
            框选:
                Math.abs(dis.x) 计算宽度
                Math.abs(dis.y) 计算高度
                ……
        */
    }
    end(e){
        /*
            拖拽：
                不做任何事
            框选:
                删除框    
        */
        this.dispatch("dragend",{...e,type:"dragend"});
    }
}

class DragEl extends Drag {
    constructor(...arg){
        super(...arg);
        this.startOffset= {};
        this.boomEls = [];
        this.on("dragstart",(e)=>{
            this.dragStart(e);
        });
        this.on("dragmove",(e,dis,now)=>{
            this.dragMove(e,dis,now);
        });
    }
    dragStart(e){
        this.startOffset = {
            x: parseFloat(getComputedStyle(this.el)["left"]),
            y: parseFloat(getComputedStyle(this.el)["top"])
        };
    }
    dragMove(e,dis,now){
        let nowOffset = {
            x: this.startOffset.x + dis.x,
            y: this.startOffset.y + dis.y
        };
        this.el.style.left = nowOffset.x + "px";
        this.el.style.top = nowOffset.y + "px";
        /*
            和 this.boomEls 里的元素进行碰撞检测
        */
    }
}
class DragSelect extends Drag{
    constructor(...arg){
        super(...arg);
        this.select = null;
        this.on("dragstart",(e)=>{
            this.dragStart(e);
        });
        this.on("dragmove",(e,dis,now)=>{
            this.dragMove(e,dis,now);
        });
        this.on("dragend",(e,dis,now)=>{
            this.dragEnd(e);
        });
    }
    dragStart(e){
        this.select = document.createElement("div");
        this.select.className = "selectBox";
        document.body.appendChild(this.select);
    }
    dragMove(e,dis,now){
       this.select.style.width = Math.abs(dis.x) + "px"; // 框的宽度就是两个坐标点的x差值
       this.select.style.height = Math.abs(dis.y) + "px"; // 框的高度就是两个坐标点的y差值
       this.select.style.left = Math.min(now.x,this.startMouse.x) + "px"; // 两个坐标谁在左侧，谁就是left
       this.select.style.top = Math.min(now.y,this.startMouse.y) + "px";
    }
    dragEnd(e){
        this.select.remove();
    }
}