(function (doc) {
    if (doc.addEventListener) {
        var keycode = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            13: 'enter',
            9: 'tab'
        };
        // 键盘高亮类名
        var className = 'outline';
        // 高亮的元素
        var target = null;
        // 高亮类名的添加与删除
        var classList = {
            add: function (ele) {
                ele.className = ele.className + ' ' + className;
            },
            remove: function (ele) {
                // console.log(target)
                // target.style.visibility = 'hidden'
                ele.className = ele.className.split(/\s+/).filter(function (cl) {
                    if (cl != className) {
                        return cl;    
                    }
                }).join(' ');
            },
            removeAll: function () {
                // console.log(document.querySelector('.outline'));
                // console.log(doc.querySelectorAll('.' + className));
                // console.log('removeall');
                [].slice.call(doc.querySelectorAll('.' + className)).forEach(function (ele) {
                    classList.remove(ele);
                });
            },
            has: function (ele) {
                return ele.className.split(/\s+/).filter(function (cl) {
                    if (cl == className) {
                        return cl;    
                    }
                }).length > 0;
            }
        };
        
        //键盘事件
        doc.addEventListener('keydown', function (event) {
            // 是否是上下左右键
            var direction = keycode[event.keyCode];
            console.log(direction)
            if (!direction) {
                return;    
            }
            if (direction == 'tab') {
                classList.removeAll();
                return;
            }
            // 当前激活元素
            var trigger = doc.activeElement;
            console.log(trigger)
            if (!trigger) {
                return;
            }
            // 对应的显示面板
            var attrTarget = trigger.getAttribute('target') || trigger.getAttribute('data-target');
            target = attrTarget && doc.getElementById(attrTarget);
            console.log(target)
            if (!target) {
                return;    
            }
            // 需要是显示状态
            console.log(target.clientWidth)
            if (target.clientWidth != 0 && target.clientHeight != 0) {
                return;
            }
            // 如果是回车事件
            if (direction == 'enter') {
                target.style.display = 'block'
                var eleFocus = target.querySelector('.' + className);
                // console.log(eleFocus)
                if (eleFocus) {
                    // 阻止默认的回车
                    event.preventDefault();
                    eleFocus.click();
                    return;
                }
                return;
            }
            // 如果都符合，同时有目标子元素
            // console.log(target.storeFocusableEle)
            var arrEleFocusable = target.storeFocusableEle, index = target.storeIndexFocus;
            if (!arrEleFocusable) {
                arrEleFocusable = [].slice.call(target.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)'));
                target.storeFocusableEle = arrEleFocusable;
                target.storeIndexFocus = -1;
                index = -1;
            }
            if (arrEleFocusable.length == 0) {
                return;    
            }
            // 先全部清除focus态
            arrEleFocusable.forEach(function (ele) {
                classList.remove(ele);
            });
            // 阻止默认的上下键滚屏
            event.preventDefault();
            // 索引加加减减
            if (direction == 'left' || direction == 'up') {
                index--;
                if (index < 0) {
                    index = -1;
                }
            } else if (direction == 'right' || direction == 'down') {
                index++;
                if (index > arrEleFocusable.length - 1) {
                    index = arrEleFocusable.length;
                }
            }
            console.log(arrEleFocusable[index])
            // 如果有对应的索引元素
            if (arrEleFocusable[index]) {
                // 高亮对应的控件元素
                classList.add(arrEleFocusable[index]);
            }
            // 记录索引
            target.storeIndexFocus = index;
            // console.log(target)
        });

        doc.addEventListener('mousedown', function (event) {
            
            var target = event.target;
            // console.log('取消获焦')
            // console.log(target)
            console.log(target && !classList.has(target))
            if (target && !classList.has(target)) {
                classList.removeAll();
            }
        });
    }    
})(document);