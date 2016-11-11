$(function() {
    $.fn.smoothScroll = function (callback) {
        var $object = this;
        var callbackOnlyForBody = function () {
            if (callback && $(this)[0].tagName.toLowerCase() == 'body')
                callback();
        }
        if ($object.length) {
            $('body,html').animate({
                scrollTop: $object.offset().top
            }, {
                duration: 1000,
                complete: callbackOnlyForBody
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