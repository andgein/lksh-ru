$(document).ready(function() {
	/* Click on last news */
	$('.header__last-news').click(function() {
		var $self = $(this);
		if ($self.find('a').length > 0)
			$self.find('a')[0].click();
	});
});