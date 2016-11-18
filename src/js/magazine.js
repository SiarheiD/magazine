;
var Magazine = {

	magazine: null,

	pages: [],
	currentPage: 0,
	pagesCount: 0,

	magazineSelector : '',
	container: '',
	mode: '',


	getPage: function(arg){

		var self = this;

		if (arg === 'current'){

			return self.pages.eq(self.currentPage);

		} else if (arg === 'prev') {
			if (self.currentPage > 0 ) {

				return self.pages.eq(self.currentPage - 1);

			};
		} else if (arg === 'next') {
			if (self.currentPage < self.pagesCount ) {

				return self.pages.eq(self.currentPage + 1);

			};
		} else if (typeof arg === 'number') {

			return self.pages.eq(arg);

		};
	},

/*
	Метод для проверки значения в хеше
*/
	checkHash: function(){
		var self = this;

		// страница в хеше (нумерация от 1):
		var pageNumber = Number(window.location.hash.slice(1));

		// если в хеше нет числа или < 1 - на первую страницу страницу
		// если там 100500 - на последнюю страницу
		if (isNaN(pageNumber)) {
			pageNumber = 1;
		} else 
		if (pageNumber < 1) {
			pageNumber = 1;
		} else 
		if (pageNumber > self.pagesCount){
			pageNumber = self.pagesCount;
		};

		window.location.hash = '#' + pageNumber;

// pageNumber - 1 тк  self.currentPage от 0,  pageNumber - от 1;
// если не соответствуют - переход на текущую страницу.
		if (self.currentPage !== pageNumber - 1) {
			self.currentPage = pageNumber - 1;
			View.goTo();
		};

	},

	addGradients: function(){
		var self = this;
// !! лучше взять контейнер, выпилить его из дома, изменить и запилить обратно,
// !! тк DOM обновляется каждый раз, как добавляется очередной элемент
		self.pages.each( function(){
			var gradientElement = $('<div></div>').addClass('gradient-element');
			$(this).prepend(gradientElement);
		});

		return self;
	},


	init: function(magazineSelector, pageSelector){

		var self = this;
// находим контейнер с журналом, страницы журнала
		self.magazineSelector = magazineSelector;
		self.magazine = $(magazineSelector);
		self.container = self.magazine.find('.container');
		self.pages = self.magazine.find(pageSelector);
		self.pagesCount = self.pages.length;
// добавляем элементы градиентов, синхронизируем с location.hash
		self.addGradients()
			.checkHash();

		View.zIndexRules(pageSelector)
			.checkViewMode();
// ! при загрузке дважды выполняется View.goTo() из .checkHash()  из View.checkViewMode()
	},

};