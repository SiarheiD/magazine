
	// $("main").turn({
	// 	width: 750,
	// 	height: 667,
	// 	autoCenter: true
	// });
	var sliderHeight = $('section.page').outerHeight();
	var sliderWidth = $('section.page').outerWidth();
	console.log(`${sliderHeight}  ||  ${sliderWidth}`);

	var turn = function(direction){
		console.log(direction)
	};

	var magazine = $('#flipbook');

	// $("#flipbook").turn({
	// 	height: sliderHeight,
	// 	width: sliderWidth,
	//     display: 'single'
	//     // autoCenter: true
	// });
	
$(window).on('resize', function(){


	$("#flipbook").wowBook({
		height: sliderHeight,
		width: sliderWidth*2,
	    // display: 'single'
	});

	$(window).off('resize')
});


	$(document).on('keydown', function(e){
		switch (e.keyCode) {
			case 37: {
				turn('previous');
				break;
			};
			case 39: {
				turn('next');
				break;
			}
		}
	});