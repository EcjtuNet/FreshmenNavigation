$(document).ready(function() {
	var header = $('#header')
	setInterval(headerHide, 500);
	function headerHide () {
		console.log(scrollY);
		if (scrollY >= 100) {
			// header.slideUp(500);
			header.fadeOut(500);
		} else if (scrollY < 100) {
			// header.slideDown(500);
			header.fadeIn(500);
		};
	}
});