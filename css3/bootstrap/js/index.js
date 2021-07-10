;$(function(){

	$(window).on('resize', function() {
		let $clientW = $(window).width();
		let $items = $('.lk-carousel .carousel-inner .item');
		// console.log($clientW)
		// console.log($items)
		console.log($($items[0]).children().length)
		if ($clientW > 900) {
			$items.addClass('bigImage');
			$items.children().remove('img');
		} else if ($($items[0]).children().length <= 1) {			
			// 有字幕 所有本来就有一个元素 > 1
			$items.removeClass('bigImage');
			$items.each(function(index, item) {
				// console.log(item)
				let src = $(item).data('small-image');
				$(item).prepend(`<img src="${src}">`);
			});
		}
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
		console.log(x)
		if (x > 30) {
			console.log('左滑')
			$('.carousel').carousel('next')
		} else if (x < -30) {
			console.log('右滑')
			$('.carousel').carousel('prev')
		}
	});

	// 3. 超出内容处理
    $(window).on('resize', ()=>{
        let $ul = $('.lk-product .nav-tabs');
        let $allLis = $ul.children('li');
        let totalW = 0; // 所有li的宽度
        console.log($ul)
        console.log($allLis)
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