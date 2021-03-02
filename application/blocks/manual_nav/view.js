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
	});

	function scrollIfAnchor(href) {
		if (typeof(href) != "string") {
			href.preventDefault();
			href = $(this).attr("href");

		}

		var fromTop = 60;

		if (href.includes("#")) {
			const anchor = href.split('#')[1];
			var $target = $('#'+anchor);

			if($target.length) {
				$('html, body').animate({ scrollTop: $target.offset().top - fromTop });
			} else {
				window.location.href = href;
			}
		} else if (href !== "") {
			window.location.href = href;
		}
	}    

	scrollIfAnchor(window.location.hash);

	$("body").on("click", "a.nav-link", scrollIfAnchor);

})(window, $);