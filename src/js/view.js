var animationFrame = (function(){
	return requestAnimationFrame ||
		   webkitRequestAnimationFrame ||
		   mozRequestAnimationFrame ||
		   oRequestAnimationFrame ||
		   msRequestAnimationFrame ||
		   function(callback){
		   		setTimeout(callback, 1000/60);
		   };
}());


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

					// var currentPage = pages.eq(currentIndex - 1);
					// currentPage.removeClass('turned');
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
		};

		self.clearGradient(pages);

		return self;
	},

	animatePage: function(pages, currentIndex, delta){

		var self = this;
		var targetDelta;
		var dDelta;
		var flag = false;
		var endAnimation = null;

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
		};

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

		dDelta = (targetDelta - delta.wx)/(Math.abs(targetDelta - delta.wx) * fullPageAnimationDuration)*1000/60;

// play animation from delta to targetDelta
		var animationPlay = function(){
			delta.wx += dDelta;
// Для анимации от  -.3 к 0 или от .3 к 0 (delta.wx * dDelta < 0)  для анимации в сторону 1/-1 Math.abs(delta.wx) < Math.abs(targetDelta)
			if (flag ? (delta.wx * dDelta < 0) : (Math.abs(delta.wx) < Math.abs(targetDelta)) ) {
				self.drawSheetPosition(pages, currentIndex, delta);
				animationFrame(animationPlay);
			} else {
				delta.wx = targetDelta;
				self.drawSheetPosition(pages, currentIndex, delta);

				self.endAnimation(pages, currentIndex, delta, !flag);

			};
		};
		animationPlay();
	},

	drawSheetPosition: function(pages, currentIndex, delta){

		var self = this;
		var windowSize = {x: $(window).width(), y: $(window).height()};
// two modes and two directions 
// single mode>>>>>
		if (self.viewMode === 'single') {

			if (delta.dir === 'next') {

				var page = pages.eq(currentIndex);

				var scaleValue = 1 - Math.abs(delta.wx);
				// var translateValue = -50*(1-scaleValue);
				if (currentIndex === pages.length - 1 && scaleValue < .7) {
					scaleValue = .7;
				};

				page.css('transform', 'scaleX('+ scaleValue +')');
				self.drawGradient(page, 1 - scaleValue);

			} else

			if (delta.dir === 'prev' && currentIndex > 0) {

				var page = pages.eq(currentIndex - 1);

				var scaleValue = Math.abs(delta.wx);

				page.css('transform', 'scaleX('+ scaleValue +')');
				self.drawGradient(page, 1 - scaleValue);

			};

		} else
// <<<<<<<
// for double mode >>>>
		if (self.viewMode === 'double') {

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

				} else 
				if (delta.wx < -.5) {
					scaleValue = Math.abs(delta.wx * 2) - 1;
					currentPage.css('transform', 'scaleX('+ 0 +')');
					nextPage.css('transform', 'scaleX('+ scaleValue +')');
					self.drawGradient(nextPage, 1 - scaleValue);
				}


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
				} else 
				if (delta.wx > .5) {
					scaleValue = Math.abs(delta.wx * 2) - 1;
					currentPage.css('transform', 'scaleX('+ 0 +')');
					nextPage.css('transform', 'scaleX('+ scaleValue +')');
				}

			}

		};
// <<<<<<<<<<<<<



		return self;
	},

	drawGradient: function(pageElement, opacity){

		var self = this;
		var gradientElement = pageElement.find('.gradient-element');

		pageElement.addClass('visible-gradient');
		gradientElement.css('opacity', opacity);

	},

	clearGradient: function(pages){

		pages.removeClass('visible-gradient');

	},

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


	},


	checkViewMode: function(){
		var self = this;

		if ( $(window).width()/$(window).height() >= 750/667) {
			if (self.viewMode !== 'double') {
				self.viewMode = 'double';
				self.goTo(Magazine.currentPage);
			};
		} else {
			if (self.viewMode !== 'single') {
				self.viewMode = 'single';
				self.goTo(Magazine.currentPage);
			};
		};

		return self;
	},
};