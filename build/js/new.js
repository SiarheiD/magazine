var Magazine = function(magazineSelector, pageSelector){

	var self = this;

	var magazine;
	var pages;
	var pagesCount;
	var currentPage;

	magazine    = $(magazineSelector);
	pages       = magazine.find(pageSelector);
	pagesCount  = pages.length;
	currentPage = 0;


	//функция для получения jQuery объекта страницы
	// 'prev - предыдущая, next - следующая, current - текущая,  число - страница с таким индексом'
	self.getPage = function(arg){

		if (arg === 'current'){

			return pages.eq(currentPage);

		} else if (arg === 'prev') {
			if (currentPage > 0 ) {

				return pages.eq(currentPage - 1);

			};
		} else if (arg === 'next') {
			if (currentPage < pagesCount ) {

				return pages.eq(currentPage + 1);

			};
		} else if (typeof arg === 'number') {

			return pages.eq(arg);

		};
	};

	self.checkHash = function(){

		// номера страниц в хеше нумерются от 1
		var pageNumber = Number(window.location.hash.slice(1));

		// если в хеше бред - на первую страницу, если 100500 - на последнюю
		if (isNaN(pageNumber) || pageNumber < 1) {

			pageNumber = 1;

		} else if (pageNumber > pagesCount) {

			pageNumber = pagesCount;

		};

		window.location.hash = '#' + pageNumber;

		if (currentPage !== pageNumber - 1) {

			currentPage = pageNumber - 1;
			$(document).trigger('pagechanged');

		};
	};

	

};

var Controller = {



};


var magazine = new Magazine('#magazine', '.magazine-page');

(function(){

	var app = {

		init: function(){
			this.events();
			this.main();
		},

		main: function(){},

		events: function(){


			$(document).on('pagechanged', function(evt){
				console.log(evt.type)
			});




			$(window).on('hashchange', Controller.hashChanged);

		},



	};

	app.init();

}());