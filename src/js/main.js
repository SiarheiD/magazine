var magazineSelector = '#magazine';
var pageSelector = '.magazine-page';
var gradientElementSelector = '.gradient-element';
var fullPageAnimationDuration = 100;
var handleHashChange = false;




//  init function 

(function(){

	var app = {

		init: function(){

			this.event();
			this.main();

		},

		main: function(){

			Magazine.init(magazineSelector, pageSelector);

		},

		event: function(){

			var mouseDown = function(evt) {

				if (evt.type === 'touchstart') {
					evt.originalEvent.changedTouches[0].preventDefault = evt.preventDefault;
					evt.originalEvent.changedTouches[0].stopPropagation = evt.stopPropagation;
					evt = evt.originalEvent.changedTouches[0];
				};

				var windowSize = {x: $(window).width(), y: $(window).height()};
				var firstClick = {x: evt.pageX, y: evt.pageY};
				var moved = false;

					evt.preventDefault();
					evt.stopPropagation();
					var movedIn = {}, delta = {};

					$(document).on('mousemove touchmove', function(evt){

						if (evt.type === 'touchmove') {
							evt.originalEvent.changedTouches[0].preventDefault = evt.preventDefault;
							evt.originalEvent.changedTouches[0].stopPropagation = evt.stopPropagation;
							evt = evt.originalEvent.changedTouches[0];
						};

						movedIn.x = evt.pageX;
						movedIn.y = evt.pageY;

						delta.x = movedIn.x - firstClick.x;
						delta.y = movedIn.y - firstClick.y;
						delta.wx = (movedIn.x - firstClick.x)/windowSize.x;
						delta.wy = (movedIn.y - firstClick.y)/windowSize.y;

						if (Math.abs(delta.x) > 5) {
							evt.preventDefault();
							evt.stopPropagation();

							if (!moved){
								delta.dir = delta.x < 0 ? 'next' : 'prev';
								moved = true;
							};
							if ( (delta.x < 0 && delta.dir === 'next') || (delta.x > 0 && delta.dir === 'prev') ) {
								Controller.handleMove(delta);
							};
						};

					}.debounce(1000/60));

					$(document).on('mouseup touchend', function(){
						// любо все вернуть на место, либо промотать страничку
						if (moved) {
							Controller.mouseUp(delta);
						};

						$(this).off('mousemove');
						$(this).off('mouseup');
						$(this).off('touchmove');
						$(this).off('touchend');
					});

			};

			$(window).on('mousedown touchstart', mouseDown);
			$(document).on('click', '.play-button', Controller.playVideo);
			$(window).on('resize', Controller.resize);
			$(window).on('hashchange', Controller.hashChanged);

			$('video').on('click', function(){
				var playButton = $(this).siblings('.play-button');
				if (this.paused) {
					this.play();
					// playButton.addClass('hidden');
				} else {
					this.pause();
					// playButton.removeClass('hidden');
				}

			});

			$(document).on('pageflip', function(){
				$('video.active').each(function(){
					this.pause();
				});
			});
		},

	};

	app.init();

}());