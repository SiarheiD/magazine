
var Model = {

	// get / set !!!!

	currentPage: 0,
	pagesCount: 0,


	init: function(){



	},

};

var View = {

	magazine: null,
	pages: [],
	currentPage: 0,

	init: function(magazineSelector, pageSelector){

		var self = this;

		self.magazine = $(magazineSelector);
		self.pages = self.magazine.find(pageSelector);
		self.currentPage = 0;

	},

};



var Controller = {

	chekHash: function(){



	},

	init: function(magazineSelector, pageSelector){

		var self = this;

		View.init();
		Model.init(View);

	},

};



(function(){

	var app = {

		main: function(){

			var magazineSelector = '#magazine';
			var pageSelector     = '.magazine-page';

			Controller.init(magazineSelector, pageSelector);

			return this;
		},

		events: function(){


			$(window).on('hashchange', Controller.checkHash);






			return this;
		},

		init: function(){

			this.main()
				.events();

		}


	}

}())