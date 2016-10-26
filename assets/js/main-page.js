/* Parallax */

var sqr = function(x) { return x * x; }

$(document).ready(function() {
	var PARALLAX_COEFFICIENT = 0.1;

	var $container = $('.portraits')
	var $portraits = $container.find('.portrait');

	var initParallax = function($elements) {
		$elements.each(function() {
			var $self = $(this);
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
				var coeff = sqr(5 - $self.data('level')) * PARALLAX_COEFFICIENT / 2;
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

	// createPortraitsParallax();
});

/* Subscribe form */

$(document).ready(function(){
	var $form = $('.subscribe-form');
	var $description = $form.closest('.school-announce').find('.description');
	var $emailInput = $form.find('input[type="text"]');

	var subscribe = function (e) {
		if (e)
			e.preventDefault();

		var email = $emailInput.val();
		$emailInput.removeClass('invalid');
		if (email == '') {
			$emailInput.addClass('invalid');
			return false;
		}

		$.post('/subscribe.php', {
			email: email
		}).done(function(data) {

		}).always(function() {

		});

		return false;
	}

	$form.find('a.button').click(subscribe);
	$emailInput.keyup(function (e) {
		/* If Enter */
		if (e.keyCode == 13)
			subscribe();
	});
});