$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        $('.navbar-hero').addClass("sticky");
    } else {
        $('.navbar-hero').removeClass("sticky");
    }
});
$(function() {
    $('.cart-sidebar-toggle').click(function(event) {
        $(this).toggleClass('active');
        $('.overly-mask').toggleClass('is-visible');
        $('.cart-sidebar').toggleClass('is-visible');
        $('.cartMenu ').toggleClass('open');
        $('body').toggleClass('modal-open');
        if ($('.megamenu').hasClass('stuck')) {
            $('.cart-sidebar').addClass('hasTopBar');
        } else {
            $('.cart-sidebar').removeClass('hasTopBar');
        }
    });
    $('.menu-sidebar-toggle').click(function(event) {
        $(this).toggleClass('active');
        $('.menu-overly-mask').toggleClass('is-visible');
        $('.menu-sidebar').toggleClass('is-visible');
    });
    $(".menu-close-trigger, .menu-overly-mask").click(function(event) {
        $('.menu-overly-mask').toggleClass('is-visible');
        $('.menu-sidebar-toggle').toggleClass('active');
        $('.menu-sidebar').toggleClass('is-visible');
    });
    $(".overly-mask, .cart-close-trigger").click(function(event) {
        $('.overly-mask').toggleClass('is-visible');
        $('.cart-sidebar').toggleClass('is-visible')
        $('.cart-sidebar-toggle').toggleClass('active');
        $('.cartMenu ').toggleClass('open');
        $('body').toggleClass('modal-open');
    });
    $(".search-trigger").on('click', function(e) {
        $('.search-overly-mask').toggleClass("open");
        e.preventDefault();
    });
    $(".search-overly-close-trigger").on('click', function(e) {
        $('.search-overly-mask').removeClass("open");
        e.preventDefault();
    });
});