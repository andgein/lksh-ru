$(document).ready(function(){
	var $enrolledList = $('.enrolled-list');

	$enrolledList.find('.enrolled-list-switcher').click(function(e){
		e.preventDefault();

		var $self = $(this);

		$('.enrolled-list-switcher').removeClass('active');
		$self.addClass('active');

		$enrolledList.find('.by-name, .by-parallel').fadeOut(100);
		setTimeout(function () {
			$enrolledList.find($self.attr('href')).fadeIn('fast');
		}, 100);
	})
});