
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
	


	$("#flipbook").wowBook({
		height: sliderHeight,
		width: sliderWidth*2,
	    // display: 'single'
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