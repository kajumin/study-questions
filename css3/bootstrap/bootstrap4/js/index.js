$(function() {
	$(window).on('resize', function() {
		let $clientW = $(window).width();
		let $carouselItems = $('.carousel-item');
		let isShowBigImage = $clientW >= 900;
		// console.log($carouselItems);

		$carouselItems.each(function (index, item) {
			// console.log(item)
			let src = isShowBigImage ? $(item).data('big-img') : $(item).data('sm-img');
			if (isShowBigImage) {
				$(item).empty();
				let imgSrc = `url(${src})`;
				// console.log(src)
				$(item).css({
					'background-image': imgSrc
				});
			} else {
				$(item).css({
					'background-image': 'none'
				});
				// console.log(!$(item).children().length)
				if (!$(item).children().length) {
					$(item).empty().append(`<img src="${src}">`);
				}			
			}
		});
	}).trigger('resize');

	// 2.轮播图拖拽滚动
	let startX = 0;
	let endX = 0;
	let $carouselInner = $('.carousel-inner');
	let carouselInner = $carouselInner[0];
	carouselInner.addEventListener('touchstart', function(e) {
		startX = e.touches[0].clientX;
		// console.log(startX)
	});
	carouselInner.addEventListener('touchmove', function(e) {
		endX = e.touches[0].clientX;
		// console.log(endX)
	});
	carouselInner.addEventListener('touchend', function(e) {
		let x = startX - endX;
		// console.log(x)
		if (x > 30) {
			$('.carousel-inner').prev();
		} else if (x < -30) {
			$('.carousel-inner').next();
		}
		
	});

	// 3. 超出内容处理
    $(window).on('resize', ()=>{
        let $ul = $('.lk-produce .nav-tabs');
        let $allLis = $ul.children('.nav-item');
        let totalW = 0; // 所有li的宽度
        // console.log($ul)
        // console.log($allLis)
        $allLis.each((index, li)=>{
            totalW += $(li).width();
        });
        // console.log(totalW);

        // 获取父标签的宽度
        let parentW = $ul.parent().width();
        // console.log(parentW);
        if(totalW > parentW){
            $ul.css({
                width: totalW + 'px'
            })
        } else {
            $ul.removeAttr('style');
        }
    }).trigger('resize');

});