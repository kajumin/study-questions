function animate(dom,json,time,callback){
	/*分析:
		定义间隔定时器，循环动画到目标值
		既然是循环动画，那个每次动画都是一个步长
		首要问题就是要得到 
		总次数=总事件 / 定时器的间隔时间
		步长值=总距离(目标值-初始值) / 总次数 
		
	*/
	//计数器
	var count = 0;
	// 定义间隔时间 如果小就会导致速度很慢
	var interval = 20;
	// 总次数 = 总时间 / 间隔时间
	var allCount = time / interval;

	// 获得总距离，就是用目标值 - 初始值
	// json里面传递都是目标值
	// 案例中left=-idx*width
	
	// 定义一个nowjson 用于保存元素的初始值
	var nowjson={};

	for(var i in json) {
		nowjson[i]=parseInt(getComputedStyle(dom)[i]);
		// json中保留的是什么值就取什么值  案例中left  i=left
		// console.log(parseInt(getComputedStyle(dom)[i]));
	}

	// console.log(nowjson);
	// 循环后 初始值也就有了

	var stepJson={};
	for(var i in json) {
		// 步长值= (目标值-初始值) / 总次数
		stepJson[i] = (json[i] - nowjson[i]) / allCount;
	}
	// console.log(stepJson)

	// 定义定时器
	var timer2=setInterval(function(){
		console.log("timer2")
		// 计数器++
		count++;
		// 该表dom的定位值
		for(var i in json) {
			// 当前值=初始值+步长值*次数
			dom.style[i] = nowjson[i]+stepJson[i]*count+"px";
		}

		// 判断是都到大边界
		if(count >= allCount){
			for(var i in json) {
				dom.style[i]=json[i]+"px";
			}
			clearInterval(timer2);
			callback&&callback();
		}
	},interval);

}