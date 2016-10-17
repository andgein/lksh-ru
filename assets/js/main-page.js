$(document).ready(function() {
	var PARALLAX_COEFFICIENT = 0.1;

	var $container = $('.portraits')
	var $portraits = $container.find('.portrait');

	var initParallax = function($elements) {
		$elements.each(function() {
			var $self = $(this);
			// $self.data('init-left', $self.css('left'));
			$self.data('init-top', $self.css('top'));

			for (var level = 1; level <= 4; level++)
				if ($self.hasClass('level-' + level))
					$self.data('level', level)
		});
	}

	var parallaxHandler = function () {
		var containerTop = $container.offset().top;
		var containerBottom = containerTop + $container.height();

		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scrollTop >= containerTop - windowHeight && scrollTop <= containerBottom) {
			var diff = scrollTop - containerTop;
			$portraits.each(function() {
				var $self = $(this);
				var coeff = (5 - $self.data('level')) * PARALLAX_COEFFICIENT;
				var top = Math.floor(parseInt($self.data('init-top')) - coeff * diff);
				$self.css('top', top + 'px');
			});
		}
	}

	var createPortraitsParallax = function() {
		initParallax($portraits);
		parallaxHandler();
		$(window).scroll(parallaxHandler);		
	}

	createPortraitsParallax();
});