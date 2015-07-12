(function($) {
    $.fn.dpsMarquee = function(o) {
        o = $.extend({
            stopOnmouseover: true,
            speed: 50,
            easing: 'linear',
            vertical: false,
            circular: true,
            delay: 0
        }, o || {});
        return this.each(function() {
            var div = $(this);
            div.parent().css({ position: 'relative', 'overflow': 'hidden' });
            var pw = div.parent().width();
            div.css({ position: 'absolute', left: pw, 'white-space': 'nowrap' });
            function start() {
                var dleft = div.position().left;
                var w = $(div.children()[1]).position().left; //.outerWidth(true);
                if (dleft + w <= 0) {
                    var fchild = $(div.children()[0]);
                    fchild.remove();
                    div.append(fchild);
                    div.css({ left: dleft + w });
                    dleft += w;
                    w = $(div.children()[1]).position().left; //.outerWidth(true);
                }
                if (o.delay > 0)
                    div.delay(o.delay).animate({ left: -1 * (w) }, (dleft + w) / o.speed * 1000, o.easing, start);
                else
                    div.animate({ left: -1 * (w) }, (dleft + w) / o.speed * 1000, o.easing, start);
            };
            function stop() {
                div.stop(true);
            };
            if (div.children().length == 0) return;
            else if (div.children().length == 1) {
                var fchild = $(div.children()[0]);
                div.append(fchild.clone());
            };
            var cNum = div.children().length;
            while (div.width() < pw * 1.5) {
                for (var i = 0; i < cNum; i++) {
                    var fchild = $(div.children()[i]);
                    div.append(fchild.clone());
                }
            }
            div.animate({ left: 0 }, pw / o.speed * 1000, o.easing, start);
            if (o.stopOnmouseover) {
                var tm;
                div.hover(function() {
                    clearTimeout(tm);
                    stop();
                },
                function() {
                    tm = setTimeout(start(), 200);
                });
            }
        });
    }
