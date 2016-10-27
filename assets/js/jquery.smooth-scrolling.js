$(function() {
    $.fn.smoothScroll = function (callback) {
        var $object = this;
        if ($object.length) {
            $('body').animate({
                scrollTop: $object.offset().top
            }, {
                duration: 1000,
                complete: callback
            }); 
            return true;
        } 
        return false;
    }

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
            return ! $target.smoothScroll();
        }
    });
});