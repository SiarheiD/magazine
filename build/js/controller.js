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


};