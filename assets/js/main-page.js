/* Parallax */

var sqr = function(x) { return x * x; }

$(document).ready(function() {
	var PARALLAX_COEFFICIENT = 0.15;

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

		$elements.find('.cite').each(function() {
			var $self = $(this);
			$self.data('init-top', $self.css('top'));
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
				var coeff = (2 - $self.data('level')) * PARALLAX_COEFFICIENT;
				var top = Math.floor(parseInt($self.data('init-top')) - coeff * diff);
				$self.css('top', top + 'px');
			});
			$portraits.find('.cite').each(function(){
				var $self = $(this);
				var top = Math.floor(parseInt($self.data('init-top')) - 0.1 * diff);
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

/* Subscribe form */

$(document).ready(function(){
	var $form = $('.subscribe-form');
	var $description = $form.closest('.school-announce').find('.description');
	var $anotherEmailLink = $form.closest('.school-announce').find('.another-email-link');
	var $emailInput = $form.find('input[type="text"]');	
	var hasLocalStorage = 'localStorage' in window && window['localStorage'] !== null;
	var localStorageKey = 'subscribe_email';

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
			setSubscriptionEmail(email);
		}).always(function() {
		});

		return false;
	}

	var setSubscriptionEmail = function (email) {
		$description.find('.colon').hide();
		$description.find('.email').html('на&nbsp;<span></span>').show().find('span').text(email);

		$anotherEmailLink.css('display', 'inline-block');
		$form.hide();

		if (hasLocalStorage)
			localStorage[localStorageKey] = email;
	}

	var showSubscribeForm = function (e) {
		e.preventDefault();

		$form.show();
		$anotherEmailLink.hide();
	}

	$form.find('a.button').click(subscribe);
	$emailInput.keyup(function (e) {
		/* If Enter */
		if (e.keyCode == 13)
			subscribe();
	});

	$anotherEmailLink.click(showSubscribeForm);
	if (hasLocalStorage && localStorage[localStorageKey])
		setSubscriptionEmail(localStorage[localStorageKey]);

	/* Mark header image as loaded */
	$('<img/>').attr('src', 'images/main/header.jpg').on('load', function() {
	   $(this).remove();
	   $('.header__top').addClass('loaded');
	});
});