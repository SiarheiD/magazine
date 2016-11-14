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

		View.drawSheetPosition(Magazine.pages, Magazine.currentPage, delta);

	},

};