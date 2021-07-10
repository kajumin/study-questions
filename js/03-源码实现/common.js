	// 1.注册事件
	function addEvent(ele, type, fn, useCapture) {
		var useCapture = useCapture || false
		if(ele.addEventListener) {
			// 事件是否在捕获阶段触发
			console.log('addEventListener')
			ele.addEventListener(type, fn, useCapture)
		} else if(ele.attachEvent) {
			console.log('attachEvent')
			ele.attachEvent('on'+ type, fn)
		} else {
			ele['on'+type] = fn
		}
	}
	// 2.移除事件
	function removeEvent(ele, type, fn, useCapture) {
		if(ele.removeEventListener) {
			ele.removeEventListener(type, fn, useCapture)
		} else if(ele.detachEvent) {
			ele.detachEvent('on' + type, fn)
		} else {
			ele['on' + type] = null
		}
	}

	// 3.阻止默认行为
	function preventDefault(e) {
		var e = e || window.event
		if(e.preventDefault) {
			console.log('preventDefault')
			e.preventDefault();
		} else {
			console.log('returnValue')
			e.returnValue = false;
		}
	}
	// 4.阻止事件冒泡
	function stopPropagation(e) {
		if(e.stopPropagation) {
			console.log('stop')
			e.stopPropagation()
		}else {
			e.cancelBubble = true
		}
	}
	// 5.获取事件对象
	function getTarget(e) {
		if(e.target) {
			console.log('target')
			return e.target
		} else if(window.event.srcElement) {
			console.log('srcElement')
			return window.event.srcElement
		}
	}
	// 6.获取滚动位置
	function getPosition(e) {
		return {
			top: document.documentElement.scrollTop || document.body.scrollTop,
			left: document.documentElement.scrollLeft || document.body.scrollLeft
		}
	}
	// 7.获取鼠标位置
	function getMousePosition(e) {
		if(e.pageX || e.pageY) {
			return {
				x: e.pageX,
				y: e.pageY
			}
		} else {
			console.log('非pageY')
			return {
				x: e.clientX + document.body.scrollTop - document.body.clientTop,
				y: e.clientY + document.body.scrollLeft - document.body.clientLeft
			}
		}
	}
	// 8.获取可视窗口大小
	function getWindow() {
		if(typeof window.innerWidth != 'undefined') {
			console.log('window.innerWidth')
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		} else {
			console.log('documentElement.clientWidth')
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientWidth
			}
		}
	}
	// 8.2设置标签之间的内容
	// 处理innerText和textContent的兼容性问题
	function setInnerText(element, content) {
	  // 判断当前浏览器是否支持 innerText
	  if (typeof element.innerText === 'string') {
	    element.innerText = content;
	  } else {
	    element.textContent = content;
	  }
	}
	
	/*
	document.documentElement.scrollTop(chrome为0) document.body.scrollTop(firefox为0) 总有一个为0 firefox也是用scrollTop
	*/
	// console.log(document.documentElement.scrollHeight)//5016
	// console.log(document.body.scrollHeight)//5000

	// console.log(document.documentElement.scrollTop)//600
	// console.log(document.body.scrollTop) //0

	// console.log(document.documentElement.clientWidth) //1349
	// console.log(document.body.clientWidth) //1333

	// function moveDown(e) {
	// 	console.log('e.pageY:', e.pageY)
	// 	console.log('e.clientY:', e.clientY)
	// 	console.log(e.clientY + document.body.scrollTop + document.documentElement.scrollTop - document.body.clientTop)
	// 	console.log(document.body.clientTop)
	// }
	// window.onmousedown = moveDown