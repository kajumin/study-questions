function bindEvent(dom,type,fn) {
	// 判断type类型
	if(type.toLowerCase()==="mousewheel") {
		// 判断是否是火狐浏览器
		var isFF = window.navigator.userAgent.indexOf("Firefox") === -1?false:true;
		if(isFF){
			dom.addEventListener("DOMMouseScroll",fn,false);
			return;
		}
	}
	// 检测浏览器支持哪种能力
	if(dom.addEventListener){
		dom.addEventListener(type,fn,{ passive: false });
	}else if(dom.attachEvent){
		// ie高级版本
		dom.attachEvent("on",type,fn);
	}else{
		dom["on"+type] = fn;
	}
}