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
        // 高亮类名的添加与删除
        var classList = {
            add: function (ele) {
                ele.className = ele.className + ' ' + className;
            },
            remove: function (ele) {
                ele.className = ele.className.split(/\s+/).filter(function (cl) {
                    if (cl != className) {
                        return cl;    
                    }
                }).join(' ');
            },
            removeAll: function () {
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
            console.log('keydown')
            // 是否是上下左右键
            var direction = keycode[event.keyCode];
            if (!direction) {
                return;    
            }
            console.log('direction', direction)
            // 第一次tab触发这个条件 清除显示内容的outline
            if (direction == 'tab') {
                classList.removeAll();
                return;
            }
            console.log('tab')
            // 当前激活元素
            var trigger = doc.activeElement;
            if (!trigger) {
                return;
            }
            console.log('有激活元素', trigger)
            // 对应的面板
            var attrTarget = trigger.getAttribute('target') || trigger.getAttribute('data-target');
            var target = attrTarget && doc.getElementById(attrTarget);
            if (!target) {
                return;    
            }
            console.log('对应的面板')
            // 需要是显示状态
            if (target.clientWidth == 0 && target.clientHeight == 0) {
                return;
            }
            console.log('对应的面板为显示状态')
            // 如果是回车事件
            if (direction == 'enter') {
                var eleFocus = target.querySelector('.' + className);
                console.log('enter', eleFocus)
                if (eleFocus) {
                    // 阻止默认的回车
                    event.preventDefault();
                    eleFocus.click();
                    return;
                } else {
                    // 自己新增的
                    trigger.click()
                }
            }
            // 如果都符合，同时有目标子元素
            var arrEleFocusable = target.storeFocusableEle, index = target.storeIndexFocus;
           
            if (!arrEleFocusable) {
                arrEleFocusable = [].slice.call(target.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)'));
                target.storeFocusableEle = arrEleFocusable;
                target.storeIndexFocus = -1;
                index = -1;
            } 
            console.log(arrEleFocusable) //第一次计算
            console.log(index) //第二次增减
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
            // 如果有对应的索引元素
            if (arrEleFocusable[index]) {
                // 高亮对应的控件元素
                classList.add(arrEleFocusable[index]);
            }
            // 记录索引
            target.storeIndexFocus = index;
        });

        doc.addEventListener('mousedown', function (event) {
            console.log('mousedown')
            var target = event.target;
            if (target && !classList.has(target)) {
                classList.removeAll();
            }
        });
    }    
})(document);