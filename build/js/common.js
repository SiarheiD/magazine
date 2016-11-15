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

function animate(options) {

  var start = performance.now();

  animationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      animationFrame(animate);
    } else {
    	// options.callback
    }

  });
}