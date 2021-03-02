(function(global, $) {

	$('#menu-button').click(() => {
		if ($('#menu-button').hasClass('is-active')) {
			$('#menu-button').removeClass('is-active');
			$('#manual-nav').removeClass('is-active');
		} else {
			$('#menu-button').addClass('is-active');
			$('#manual-nav').addClass('is-active');
		}
	});

	$('#manual-nav > li > a').each((i, item) => {
		$(item).click(() => {
			$('#menu-button').removeClass('is-active');
			$('#manual-nav').removeClass('is-active');
		})
	})

})(window, $);