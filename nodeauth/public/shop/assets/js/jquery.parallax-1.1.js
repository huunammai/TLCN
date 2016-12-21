function RepositionNav() {
        var windowHeight = $(window).height();
        var navHeight = $('#nav').height() / 2;
        var windowCenter = (windowHeight / 2);
        var newtop = windowCenter - navHeight;
        $('#nav').css({
            "top": newtop
        });
    }
    (function($) {
        $.fn.parallax = function(xpos, adjuster, inertia, outerHeight) {
            function inView(pos, element) {
                element.each(function() {
                    var element = $(this);
                    var top = element.offset().top;
                    if (outerHeight == true) {
                        var height = element.outerHeight(true);
                    } else {
                        var height = element.height();
                    }
                    if (top + height >= pos && top + height - windowHeight < pos) {
                        move(pos, height);
                    }
                    if (top <= pos && (top + height) >= pos && (top - windowHeight) < pos && top + height - windowHeight > pos) {
                        move(pos, height);
                    }
                    if (top + height > pos && top - windowHeight < pos && top > pos) {
                        move(pos, height);
                    }
                });
            }
            var $window = $(window);
            var windowHeight = $(window).height();
            var pos = $window.scrollTop();
            var $this = $(this);
            if (xpos == null) {
                xpos = "50%"
            }
            if (adjuster == null) {
                adjuster = 0
            }
            if (inertia == null) {
                inertia = 0.1
            }
            if (outerHeight == null) {
                outerHeight = true
            }
            height = $this.height();
            $this.css({
                'backgroundPosition': newPos(xpos, outerHeight, adjuster, inertia)
            });

            function newPos(xpos, windowHeight, pos, adjuster, inertia) {
                return xpos + " " + Math.round((-((windowHeight + pos) - adjuster) * inertia)) + "px";
            }

            function move(pos, height) {
                $this.css({
                    'backgroundPosition': newPos(xpos, height, pos, adjuster, inertia)
                });
            }
            $window.bind('scroll', function() {
                var pos = $window.scrollTop();
                inView(pos, $this);
                $('#pixels').html(pos);
            })
        }
    })(jQuery);