$(document).ready(function() {
    var tm = null;
    var oLwidth = 0;
    var oRwidth = 0;
    $(window).scroll(reposition);
    $(window).resize(reposition);
    $('.float-banner img').load(reposition);
    function reposition() {
        var scrollTop = $(window).scrollTop();
        var wwidth = $(window).innerWidth();
        $('.float-banner img').css({ width: 'auto' });
        oLwidth = $('.float-banner .left').width();
        oRwidth = $('.float-banner .right').width();

        var lwidth = oLwidth;
        var rwidth = oRwidth;
        if (wwidth <= 984 + 200)
            $('.float-banner').hide();
        else {
            $('.float-banner').show();
            $('.float-banner .left').css({ left: 0 });
            $('.float-banner .right').css({ right: 0 });
            if ((wwidth < 984 + lwidth + rwidth) && (oLwidth > 0 && oRwidth > 0)) {
                var nw = (wwidth - 984) / 2;
                $('.float-banner .left img').css({ width: nw });
                $('.float-banner .right img').css({ width: nw });
                $('.float-banner').css({ width: 984 + (nw * 2) });
            }
            else {
                $('.float-banner').css({ width: 984 + lwidth + rwidth });
            }
            var fw = $('.float-banner').width();
            $('.float-banner').css({ left: (wwidth - fw) / 2 });
            //            $('.float-banner').css({ width: wwidth });
            if (tm)
                clearTimeout(tm);
            tm = window.setTimeout(function() {
                $('.float-banner div').animate({ top: scrollTop < 32 ? 32 : scrollTop }, 1000);
            }, 200);
        }
    }
});
