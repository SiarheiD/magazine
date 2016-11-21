;
var View = {

	viewMode: '',

	endAnimation: function(pages, currentIndex, delta, flag){

		var self = this;

		if (flag) {

			if (self.viewMode === 'single'){
				if (delta.dir === 'next'){

					var currentPage = pages.eq(currentIndex);
					currentPage.addClass('turned');
					currentPage.css('transform', '');
					Magazine.currentPage += 1;

				} else 
				if (delta.dir === 'prev' && currentIndex > 0) {

					var currentPage = pages.eq(currentIndex - 1);
					currentPage.removeClass('turned');
					currentPage.css('transform', '');
					Magazine.currentPage -= 1;

				};
			} else

			if (self.viewMode === 'double'){
				if (delta.dir === 'next'){

					var currentPage = pages.eq(currentIndex);
					var nextPage = pages.eq(currentIndex + 1);

					if (Magazine.currentPage % 2 === 0) {

						currentPage = pages.eq(currentIndex);
						nextPage = pages.eq(currentIndex + 1);
						Magazine.currentPage += 1;

					} else {

						currentPage = pages.eq(currentIndex + 1);
						nextPage = pages.eq(currentIndex + 2);
						Magazine.currentPage +=2;

					}

					currentPage.addClass('turned');
					nextPage.addClass('turned');
					currentPage.css('transform', '');
					nextPage.css('transform', '');


					if (Magazine.currentPage > pages.length - 1 ) {
						Magazine.currentPage = pages.length - 1;
					};

				} else 
				if (delta.dir === 'prev') {
					var currentPage;
					var nextPage;

					if (currentIndex % 2 === 0) {

						currentPage = pages.eq(currentIndex - 1);
						nextPage = pages.eq(currentIndex - 2);
						Magazine.currentPage -= 2;

					} else {

						currentPage = pages.eq(currentIndex);
						nextPage = pages.eq(currentIndex - 1);
						Magazine.currentPage -= 1;

					};

					currentPage.removeClass('turned');
					nextPage.removeClass('turned');
					currentPage.css('transform', '');
					nextPage.css('transform', '');
				};
			};

			window.location.hash = Magazine.currentPage + 1;
			$(document).trigger('pageflip');

		};

		self.clearGradient(pages);

		return self;
	},
// =========
	animatePage: function(pages, currentIndex, delta){

		var self = this;
		var targetDelta;
		var dDelta;
		var flag = false;

		var rightNow = Date.now();
		var lastFrameTimestamp;

		if (self.viewMode === 'single'){
			if (delta.dir === 'next'){

				if (delta.wx > -.3 || currentIndex === pages.length - 1 ) {
					//play forward
					flag = true;
					targetDelta = 0;
				} else {
					targetDelta = -1;
				};

			} else 
			if (delta.dir === 'prev') {
				if (currentIndex === 0) return false;
				if (delta.wx < .3) {
					//play forward
					flag = true;
					targetDelta = 0;
				} else {
					targetDelta = 1;
				};

			};
		} else 
		if (self.viewMode === 'double'){

			if (delta.dir === 'next'){

				if (delta.wx > -.3 || currentIndex === pages.length - 1 ) {
					//play forward
					flag = true;
					targetDelta = 0;
				} else {
					targetDelta = -1;
				};

			} else 
			if (delta.dir === 'prev') {

				if (currentIndex === 0) return false;
				if (delta.wx < .3) {
					//play forward
					flag = true;
					targetDelta = 0;
				} else {
					targetDelta = 1;
				};

			};
		};

		var toPlay = targetDelta - delta.wx;
// play animation from delta to targetDelta\\

		var animationPlay = function(){
			var dT;
			lastFrameTimestamp = lastFrameTimestamp === undefined ? Date.now() : lastFrameTimestamp;
			dT = Date.now() - lastFrameTimestamp;
			dDelta = (dT / (fullPageAnimationDuration)) * toPlay;
			delta.wx += dDelta;

			// Для анимации от  -.3 к 0 или от .3 к 0 (delta.wx * dDelta < 0) тк по достижении нуля поменяется знак и произведение >= 0,
			// для анимации в сторону 1/-1 Math.abs(delta.wx) < Math.abs(targetDelta)
			if (flag ? (delta.wx * toPlay < 0) : (Math.abs(delta.wx) < Math.abs(targetDelta)) ) {
				lastFrameTimestamp = Date.now();
				self.drawSheetPosition(pages, currentIndex, delta);
				animationFrame(animationPlay);
			} else {
				delta.wx = targetDelta;
				self.drawSheetPosition(pages, currentIndex, delta)
					.endAnimation(pages, currentIndex, delta, !flag);
			};
		};

		animationPlay();
	},

// ==============

	singleModeDraw : function(pages, currentIndex, delta){
		var self = this;
		var windowSize = {x: $(window).width(), y: $(window).height()};

		if (delta.dir === 'next') {

			var page = pages.eq(currentIndex);

			var scaleValue = 1 - Math.abs(delta.wx);
			// var translateValue = -50*(1-scaleValue);
			if (currentIndex === pages.length - 1 && scaleValue < .7) {
				scaleValue = .7;
			};
			page.removeClass('turned')
			page.css('transform', 'scaleX('+ scaleValue +')');
			self.drawGradient(page, 1 - scaleValue);

		} else
		if (delta.dir === 'prev' && currentIndex > 0) {

			var page = pages.eq(currentIndex - 1);
			var scaleValue = Math.abs(delta.wx);

			page.removeClass('turned')
			page.css('transform', 'scaleX('+ scaleValue +')');
			self.drawGradient(page, 1 - scaleValue);

		};

		return self;
	},

	doubleModeDraw : function(pages, currentIndex, delta){
		var self = this;
		var windowSize = {x: $(window).width(), y: $(window).height()};

		if (delta.dir === 'next') {

			var currentPage;
			var nextPage
			var scaleValue;

			if (currentIndex % 2 === 0) {
				currentPage = pages.eq(currentIndex);
				nextPage = pages.eq(currentIndex + 1);
			} else {
				currentPage = pages.eq(currentIndex + 1);
				nextPage = pages.eq(currentIndex + 2);
			};

			if (delta.wx > -.5) {
				scaleValue = 1 - Math.abs(delta.wx * 2);
				nextPage.css('transform', 'scaleX('+ 0 +')');
				currentPage.css('transform', 'scaleX('+ scaleValue +')');
				self.drawGradient(currentPage, 1 - scaleValue);

			} else {
				scaleValue = Math.abs(delta.wx * 2) - 1;
				currentPage.css('transform', 'scaleX('+ 0 +')');
				nextPage.css('transform', 'scaleX('+ scaleValue +')');
				self.drawGradient(nextPage, 1 - scaleValue);
			};

			if (currentIndex === 0) {
				var containerTranslateValue = -25 + 25 * Math.abs(delta.wx) + '%';
				Magazine.container.css('transform', 'translateX('+ containerTranslateValue +')')
			} else
			if ( Magazine.pagesCount % 2 === 0 
				 && currentIndex === Magazine.pagesCount - 2
				 || currentIndex === Magazine.pagesCount - 3) {

				var containerTranslateValue =  25 * Math.abs(delta.wx) + '%';
				Magazine.container.css('transform', 'translateX('+ containerTranslateValue +')')

			};

		} else
		if (delta.dir === 'prev' && currentIndex > 0) {

			var currentPage;
			var nextPage;

			if (currentIndex % 2 === 0) {
				currentPage = pages.eq(currentIndex - 1);
				nextPage = pages.eq(currentIndex - 2);
			} else {
				currentPage = pages.eq(currentIndex);
				nextPage = pages.eq(currentIndex - 1);
			};

			var scaleValue;

			if (delta.wx < .5) {
				scaleValue = 1 - Math.abs(delta.wx * 2);
				nextPage.css('transform', 'scaleX('+ 0 +')');
				currentPage.css('transform', 'scaleX('+ scaleValue +')');
			} else {
				scaleValue = Math.abs(delta.wx * 2) - 1;
				currentPage.css('transform', 'scaleX('+ 0 +')');
				nextPage.css('transform', 'scaleX('+ scaleValue +')');
			}

			if (currentIndex === 1 || currentIndex === 2) {
				var containerTranslateValue = -25 * Math.abs(delta.wx) + '%';
				Magazine.container.css('transform', 'translateX('+ containerTranslateValue +')')
			} else
			if (currentIndex === Magazine.pagesCount - 1) {
				var containerTranslateValue = 25 - 25 * Math.abs(delta.wx) + '%';
				Magazine.container.css('transform', 'translateX('+ containerTranslateValue +')')
			};

		};

		return self;

	},

	drawSheetPosition: null,


	drawGradient: function(pageElement, opacity){

		var self = this;
		var gradientElement = pageElement.find('.gradient-element');
		pageElement.addClass('visible-gradient');
		gradientElement.css('opacity', opacity);

	},

	clearGradient: function(pages){

		pages.removeClass('visible-gradient');

	},

/*
	метод перехода к определенной странице
*/
	goTo: function(page){
//page - page index from
		var self = this;
		var pages = Magazine.pages;

		if (page > pages.length - 1) {
			page = pages.length - 1;
		} else if (page < 0){
			page = 0;
		};

		if (page !== undefined) {
			Magazine.currentPage = page;
		} else {
			page = Magazine.currentPage;
		};

// пробегаем по страницам и в зависимости от viewMode 
// добавляем классы turned (для перевернутых страниц)
		if (self.viewMode === 'single' || (self.viewMode === 'double' && page % 2 === 0)) {
			pages.eq(page).prevAll().addClass('turned');
			pages.eq(page).nextAll().removeClass('turned');
			pages.eq(page).removeClass('turned');
		} else
		if (self.viewMode === 'double' && page % 2 !== 0) {
			pages.eq(page).prevAll().addClass('turned');
			pages.eq(page).addClass('turned');
			pages.eq(page).nextAll().removeClass('turned');
		};
		if (self.viewMode === 'double') {
			if (page === 0) {
					Magazine.container.css('transform', 'translateX(-25%)')
			} else
			if (page === Magazine.pagesCount - 1) {
				Magazine.container.css('transform', 'translateX(25%)')
			};
		} else {
			Magazine.container.css('transform', '')
		};

		self.hideUnnecessaryPages();
	},

	hideUnnecessaryPages: function(){
		var self = this;
		var pages = Magazine.pages;
		var page = Magazine.currentPage;

		pages.removeClass('hidden');

		if (self.viewMode === 'single') {

			pages.eq(page - 1 < 0 ? 0 : page - 1).prevAll().addClass('hidden');
			pages.eq(page + 1).nextAll().addClass('hidden');

		} else if (self.viewMode === 'double') {

				pages.eq(page - 3 < 0 ? 0 : page - 3).prevAll().addClass('hidden');
				pages.eq(page + 3).nextAll().addClass('hidden');

		};


	},

	checkViewMode: function(){
		var self = this;

		if ( $(window).width()/$(window).height() >= 750/667) {
			if (self.viewMode !== 'double') {
				self.viewMode = 'double';
				self.drawSheetPosition = self.doubleModeDraw;
				self.goTo(Magazine.currentPage);
			};
		} else {
			if (self.viewMode !== 'single') {
				self.viewMode = 'single';
				self.drawSheetPosition = self.singleModeDraw;
				self.goTo(Magazine.currentPage);
			};
		};

		return self;
	},

	zIndexRules: function(pageSelector){
		var self = this;
		var pagesCount = Magazine.pagesCount;
		var styleElement = $('<style type="text/css">');
		var styleRule = '';

		for (var i = 1; i <= pagesCount; i++) {

			styleRule += pageSelector + ':nth-child('+ i +')' + '{z-index: ' + (pagesCount + 10 - i) + ';}\r\n';

		};

		styleElement.text(styleRule);
		$('head').append(styleElement);

		return self;
	},
};