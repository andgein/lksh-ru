$(document).ready(function(){
	var $enrolledList = $('.enrolled-list');

	$enrolledList.find('.enrolled-list-switcher').click(function(e){
		e.preventDefault();

		var $self = $(this);

		$('.enrolled-list-switcher').removeClass('active');
		$self.addClass('active');

		/* Hide footer for disable fast appearance of it */
		$('footer').hide();
		$enrolledList.find('.by-name, .by-parallel').fadeOut(100);
		setTimeout(function () {
			$enrolledList.find($self.attr('href')).fadeIn('fast');
			$('footer').show();
		}, 100);
	})
});