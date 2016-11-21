var Controller = {

	mouseUp: function(delta){

		View.animatePage(Magazine.pages, Magazine.currentPage, delta);

	},

	hashChanged: function(){

			Magazine.checkHash();
			View.hideUnnecessaryPages();
	},

	resize: function(){
		View.checkViewMode();
	},

	handleMove: function(delta){


			View.drawSheetPosition(Magazine.pages, Magazine.currentPage, delta);


	},

	playVideo: function(){

		var video = $(this).siblings('video');
		video.addClass('active');
		video.get(0).play();

		$(this).addClass('hidden');
	}

};