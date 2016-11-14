var magazineSelector = '#magazine';
var pageSelector = '.magazine-page';
var gradientElementSelector = '.gradient-element';
var fullPageAnimationDuration = 500;
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
					evt = evt.originalEvent.changedTouches[0];
				};

				var windowSize = {x: $(window).width(), y: $(window).height()};
				var firstClick;
				firstClick = {x: evt.pageX, y: evt.pageY};
				var dir = firstClick.x > .9 * windowSize.x ? 'next': firstClick.x < .1 * windowSize.x ? 'prev' : undefined;
				var moved = false;

				if (dir !== undefined) {
					evt.preventDefault();
					var movedIn, delta;
					$(document).on('mousemove touchmove', function(evt){

						if (evt.type === 'touchmove') {
							evt.originalEvent.changedTouches[0].preventDefault = evt.preventDefault;
							evt = evt.originalEvent.changedTouches[0];
						};

						moved = true;
						movedIn = {x: evt.pageX, y: evt.pageY};
						delta = {x: movedIn.x - firstClick.x,
								 y: movedIn.y - firstClick.y,
								 wx: (movedIn.x - firstClick.x)/windowSize.x,
								 wy: (movedIn.y - firstClick.y)/windowSize.y,
								 dir: dir};

						if (Math.abs(delta.x) > 5) {
							evt.preventDefault();
							Controller.handleMove(delta);
						};

					});

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

			};

			$(document).on('mousedown touchstart', mouseDown);

			$(window).on('resize', Controller.resize);
			$(window).on('hashchange', Controller.hashChanged)
		},

	};


	app.init();

}());