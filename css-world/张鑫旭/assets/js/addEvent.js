/**
 * 简易的事件添加方法
 */
var _eventCompat = function(event) {
    console.log(event)
    event = event || window.event;
    var type = event.type;
    if (type == 'DOMMouseScroll' || type == 'mousewheel') {
        event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    }
    // 兼容target 和 preventDefault
    if (!event.target && event.srcElement ) {
        console.log('进行了target兼容处理')
        event.target = event.srcElement;    
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
        event.preventDefault = function() {
            event.returnValue = false;
        };
    }
    if (!event.stopPropagation && event.cancelBubble !== undefined) {
        console.log('进行了stopProgation兼容处理')
        event.stopPropagation = function() {
            event.cancelBubble = true;
        };
    }
    /* 
       ......其他一些兼容性处理 
    */
    return event;
};
var addEvent = function(dom, type, callback, capture) {
    if (window.addEventListener) {   
        if (type === "mousewheel" && document.mozFullScreen !== undefined) {
            type = "DOMMouseScroll";
        }
        // 火狐等高级浏览器
        dom.addEventListener(type, function(event) {
            // 传递处理过的event事件对象
            callback.call(this, _eventCompat(event));
        }, capture || false);
    } else if (window.attachEvent) {
        // ie只有冒泡型事件
        dom.attachEvent("on" + type, function(event) {
            event = event || window.event;
            callback.call(dom, _eventCompat(event));    
        });
    }
}


      