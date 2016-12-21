$(document).ready(function() {
    function customPager() {
        $.each(this.owl.userItems, function(i) {
            var pagination1 = $('.owl-controls .owl-pagination > div:first-child');
            var pagination = $('.owl-controls .owl-pagination');
            $(pagination[i]).append("<div class=' owl-has-nav owl-next'><i class='fa fa-angle-right'></i>  </div>");
            $(pagination1[i]).before("<div class=' owl-has-nav owl-prev'><i class='fa fa-angle-left'></i> </div>");
        });
    }
    var latestProductSlider = $("#productslider");
    latestProductSlider.owlCarousel({
        navigation: false,
        items: 4,
        itemsTablet: [768, 2],
        afterInit: customPager,
        afterUpdate: customPager
    });
    $(".owl-next").click(function() {
        latestProductSlider.trigger('owl.next');
    })
    $(".owl-prev").click(function() {
        latestProductSlider.trigger('owl.prev');
    })
    var owl = $(".brand-carousel");
    owl.owlCarousel({
        navigation: false,
        pagination: false,
        items: 8,
        itemsTablet: [768, 4],
        itemsMobile: [400, 2]
    });
    $("#nextBrand").click(function() {
        owl.trigger('owl.next');
    })
    $("#prevBrand").click(function() {
        owl.trigger('owl.prev');
    })
    $("#SimilarProductSlider").owlCarousel({
        navigation: false,
        afterInit: customPager,
        afterUpdate: customPager
    });
    var SimilarProductSlider = $("#SimilarProductSlider");
    SimilarProductSlider.owlCarousel({
        navigation: false,
        afterInit: customPager,
        afterUpdate: customPager
    });
    $("#SimilarProductSlider .owl-next").click(function() {
        SimilarProductSlider.trigger('owl.next');
    })
    $("#SimilarProductSlider .owl-prev").click(function() {
        SimilarProductSlider.trigger('owl.prev');
    })
    var pshowcase = $("#productShowCase");
    pshowcase.owlCarousel({
        autoPlay: 4000,
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true
    });
    $("#ps-next").click(function() {
        pshowcase.trigger('owl.next');
    })
    $("#ps-prev").click(function() {
        pshowcase.trigger('owl.prev');
    })
    var imageShowCase = $("#imageShowCase");
    imageShowCase.owlCarousel({
        autoPlay: 4000,
        stopOnHover: true,
        navigation: false,
        pagination: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true
    });
    $("#ps-next").click(function() {
        imageShowCase.trigger('owl.next');
    })
    $("#ps-prev").click(function() {
        imageShowCase.trigger('owl.prev');
    })
    $(function() {
        $('.categoryProduct > .item').responsiveEqualHeightGrid()
    });
    $(function() {
        $('.thumbnail.equalheight').responsiveEqualHeightGrid();
    });
    $(function() {
        $('.featuredImgLook2 .inner').responsiveEqualHeightGrid();
    });
    $(function() {
        $('.featuredImageLook3 .inner').responsiveEqualHeightGrid();
    });
    $(".modal-product-thumb a").click(function() {
        var largeImage = $(this).find("img").attr('data-large');
        $(".product-largeimg").attr('src', largeImage);
        $(".zoomImg").attr('src', largeImage);
    });
    $("#accordionNo .panel-collapse").each(function() {
        $(this).on('hidden.bs.collapse', function() {
            $(this).parent().find('.collapseWill').removeClass('active').addClass('hasPlus');
        });
        $(this).on('show.bs.collapse', function() {
            $(this).parent().find('.collapseWill').removeClass('hasPlus').addClass('active');
        });
    });
    $(".getFullSearch").on('click', function(e) {
        $('.search-full').addClass("active");
        e.preventDefault();
    });
    $('.search-close').on('click', function(e) {
        $('.search-full').removeClass("active");
        e.preventDefault();
    });
    $(".dropdown-tree-a").click(function() {
        $(this).parent('.dropdown-tree').toggleClass("open-tree active");
    });
    $(function() {
        var navTree = $('.nav-tree li:has(ul)');
        var navTreeA = navTree.addClass('parent_li').find(' > a');
        navTreeA.each(function() {
            if ($(this).hasClass("child-has-open")) {} else {
                $(this).addClass("child-has-close");
                var navTreeAchildren = $(this).parent('li.parent_li').find(' > ul > li');
                navTreeAchildren.hide();
            }
        });
        $('.nav-tree li.parent_li > a').on('click', function(e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).addClass('child-has-close').removeClass('child-has-open');
            } else {
                children.show('fast');
                $(this).addClass('child-has-open').removeClass('child-has-close');
            }
            e.stopPropagation();
        });
    });
    $('.add-fav').click(function(e) {
        e.preventDefault();
        $(this).addClass("active");
        $(this).attr('data-original-title', 'Added to Wishlist');
    });
    $(".change-view .list-view, .change-view-flat .list-view").click(function(e) {
        e.preventDefault();
        $('.categoryProduct  .item').addClass("list-view");
        $('.add-fav').attr("data-placement", $(this).attr("left"));
        $('.categoryProduct > .item').detectGridColumns();
    });
    $(".change-view .grid-view, .change-view-flat .grid-view").click(function(e) {
        e.preventDefault();
        $('.categoryProduct  .item').removeClass("list-view");
        $('.categoryProduct > .item').detectGridColumns();
        setTimeout(function() {
            $('.categoryProduct > .item').responsiveEqualHeightGrid();
        }, 500);
    });
    $('div.has-equal-height-child .product-item ').detectGridColumns();
    setTimeout(function() {
        $('div.has-equal-height-child .product-item').responsiveEqualHeightGrid();
    }, 500);
    $('div.has-equal-height-child > div.is-equal').responsiveEqualHeightGrid();
    $(".swatches li").click(function() {
        $(".swatches li.selected").removeClass("selected");
        $(this).addClass('selected');
    });
    $(".product-color a").click(function() {
        $(".product-color a").removeClass("active");
        $(this).addClass('active');
    });
    $(".modal-product-thumb a").click(function() {
        $(".modal-product-thumb a.selected").removeClass("selected");
        $(this).addClass('selected');
    });
    if (/IEMobile/i.test(navigator.userAgent)) {
        $('.navbar-brand').addClass('windowsphone');
    }
    var isMobile = function() {
        return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    };
    if (isMobile()) {
        $('.introContent').addClass('ismobile');
    } else {
        $(function() {
            var tshopScroll = 0;
            $(window).scroll(function(event) {
                var ts = $(this).scrollTop();
                if (ts > tshopScroll) {
                    $('.navbar').addClass('stuck');
                } else {
                    $('.navbar').removeClass('stuck');
                }
                if (ts < 600) {
                    $('.navbar').removeClass('stuck');
                }
                tshopScroll = ts;
            });
        });
    }
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $('.parallax-section').addClass('isios');
        $('.navbar-header').addClass('isios');
        $('.blog-intro').addClass('isios');
        $('.product-story-hasbg').addClass('isios');
    }
    if (/Android|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.parallax-section').addClass('isandroid');
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.parallax-section').addClass('ismobile');
        $('.parallaximg').addClass('ismobile');
    } else {
        $(window).bind('scroll', function(e) {
            parallaxScroll();
        });

        function parallaxScroll() {
            var scrolledY = $(window).scrollTop();
            var sc = ((scrolledY * 0.3)) + 'px';
            $('.parallaximg').css('marginTop', '' + ((scrolledY * 0.3)) + 'px');
            $('.parallax-windowz').css('background-position', 'center -' + ((scrolledY * 0.1)) + 'px');
        }
        if ($(window).width() < 768) {} else {
            $('.parallax-image-aboutus').parallax("50%", 0, 0.15, true);
            $('.about-3').parallax("50%", 0, 0.2, true);
            $('.parallaxbg').parallax("50%", 0, 0.2, true);
        }
    }
    $(".scroll-pane").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        },
        scrollButtons: {
            enable: false
        },
        mouseWheelPixels: "200",
        theme: "dark-2"
    });
    $(".smoothscroll").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        },
        scrollButtons: {
            enable: false
        },
        mouseWheelPixels: "100",
        theme: "dark-2"
    });
    window.onload = (function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 86) {
                $('.parallax-image-aboutus .animated').removeClass('fadeInDown');
                $('.parallax-image-aboutus .animated').addClass('fadeOutUp');
            } else {
                $('.parallax-image-aboutus .animated').addClass('fadeInDown');
                $('.parallax-image-aboutus .animated').removeClass('fadeOutUp');
            }
            if ($(window).scrollTop() > 250) {} else {}
        })
    })
    $(window).bind('resize load', function() {
        if ($(this).width() < 767) {
            $("#accordionNo .panel-collapse:not(#collapseCategory)").collapse('hide');
        }
    });
    $(".tbtn").click(function() {
        $(".themeControll").toggleClass("active");
    });
    $(document).ready(function() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-green iCheck-margin',
            radioClass: 'iradio_square-green iChk iCheck-margin'
        });
    });
    $(document).ready(function() {
        $('select').select2();
    });
    $("input[name='quanitySniper']").TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link"
    });
    $('.tooltipHere').tooltip('hide')
    var options = [];
    $(".subscribe-dropdown .dropdown-menu div, .dropdown-menu input[type='radio'], .subscribe-dropdown  .dropdown-menu input[type='checkbox'], .subscribe-dropdown .dropdown-menu input[type='button']").on('click', function(event) {
        var $target = $(event.currentTarget),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx;
        if ((idx = options.indexOf(val)) > -1) {
            options.splice(idx, 1);
            setTimeout(function() {
                $inp.prop('checked', false)
            }, 0);
        } else {
            options.push(val);
            setTimeout(function() {
                $inp.prop('checked', true)
            }, 0);
        }
        $(event.target).blur();
        console.log(options);
        return false;
    });
    $(".scrollto").click(function(event) {
        event.preventDefault();
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        $('html,body').animate({
            scrollTop: dest - 51
        }, 1000, 'swing');
    });
    $(document).ready(function() {
        $('.swatches-rounded a').click(function() {
            var colorName = $(this).attr('title');
            $('.color-value').html(colorName)
        });
        $('#productSetailsModalAjax').on('loaded.bs.modal', function(e) {
            $(".modal-product-thumb a").click(function() {
                $(".modal-product-thumb a.selected").removeClass("selected");
                $(this).addClass('selected');
                var largeImage = $(this).find("img").attr('data-large');
                $(".product-largeimg").attr('src', largeImage);
                $(".zoomImg").attr('src', largeImage);
            });
            $(".swatches li").click(function() {
                $(".swatches li.selected").removeClass("selected");
                $(this).addClass('selected');
            });
            $('.swatches-rounded a').click(function() {
                var colorName = $(this).attr('title');
                $('.color-value').html(colorName)
            });
        })
    });
});