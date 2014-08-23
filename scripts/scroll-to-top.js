$(document).ready(function() {
	var scrollToTop = $('.scroll')
	var h = window.screen.height
	setInterval(scrollHide, 500);
	function scrollHide () {
		// console.log(scrollY);
		// if (scrollY < h) {
		// 	scrollToTop.fadeOut(500);
		// } else if (scrollY > h) {
		// 	scrollToTop.fadeIn(500);
		// };
		if (scrollY == 0) {
			scrollToTop.fadeOut(500);
		} else {
			scrollToTop.fadeIn(500);
		};
	}
	scrollToTop.click(function() {
		scrollTop(0);
		// scrollY = 0;
	});
});