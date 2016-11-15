Function.prototype.debounce = function (milliseconds) {
	var baseFunction = this,
		lastEventTimestamp = null,
		limit = milliseconds;
	return function () {
		var self = this,
			args = arguments,
			now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
			lastEventTimestamp = now;
			baseFunction.apply(self, args);
		} else {};
	};
};

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