$(document).ready(function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
        $.fn.exists = function(callback) {
            var args = [].slice.call(arguments, 1);
            if (this.length) {
                callback.call(this, args);
            }
            return this;
        };
        $('.parallax-image-1').exists(function() {
            var offsetParallax1 = $(".parallax-image-1").offset().top;
            $('.parallax-image-1').parallax("50%", offsetParallax1, 0.1, true);
        });
        $('.parallax-image-2').exists(function() {
            var offsetParallax2 = $(".parallax-image-2").offset().top;
            $('.parallax-image-2').parallax("50%", offsetParallax2, 0.1, true);
        });
    }
    $('.slider-v1').cycle({
        fx: 'scrollHorz',
        slides: '.slider-item',
        timeout: 5000,
        speed: 1200,
        easeIn: 'easeInOutExpo',
        easeOut: 'easeInOutExpo',
        pager: '#pager2',
    });
    $('.slider-v2').cycle({
        fx: 'scrollHorz',
        slides: '.slider-item',
        timeout: 5000,
        speed: 1200,
        easeIn: 'easeInOutExpo',
        easeOut: 'easeInOutExpo',
        pager: '#pager',
    });
    $('#loader_img').show();
    $('.sliderImg').load(function() {
        $('#loader_img').hide();
    });
});