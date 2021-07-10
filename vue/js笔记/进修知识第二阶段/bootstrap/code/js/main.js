$(function(){

	function  resize(){
		// 当文档执行完才会执行
		// 获取屏幕的宽度
		var windowwidth = $(window).width();
		// 判断屏幕属于大还是小
		// 根据大小为界面上的每张图的哪张图
		var isSmallScreen = windowwidth < 768;
		console.log(123)
		// $("#main_ad > .carousel-inner .item")
		$("#main_ad  >  .carousel > .carousel-inner .item").each(function(i,item){
			// 拿到的是dom对象  需要转换
			var $item = $(item);
			var imgSrc = isSmallScreen ? "image-xs" : "image-lg";
			console.log($item.data(imgSrc))
			$item.css("backgroundImage",'url("'+$item.data(imgSrc)+'")');
			// console.log(imgSrc)
			if(isSmallScreen){
				$item.html('<img src="'+$item.data(imgSrc)+'" alt="" />')
			}else{
				$item.empty();
			}
				
			
	
		});

	}
	$(window).on('resize',resize).trigger('resize');
	

})