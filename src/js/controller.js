var Controller = {

	mouseUp: function(delta){

		View.animatePage(Magazine.pages, Magazine.currentPage, delta);

	},

	hashChanged: function(){

			Magazine.checkHash();

	},

	resize: function(){
		View.checkViewMode();
	},

	handleMove: function(delta){

		animationFrame(function(){
			View.drawSheetPosition(Magazine.pages, Magazine.currentPage, delta);
		});

	},

	playVideo: function(){

		var videoIframe = $(this).siblings('.video-container').find('iframe');
		var prefix = videoIframe[0].src.indexOf('?') === -1 ? '?' : '&';
		videoIframe[0].src += prefix + 'autoplay=1';

		videoIframe.parent().addClass('active');
		$(this).addClass('hidden');
	}

};