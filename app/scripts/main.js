'use strict';
(function() {

    $(function(){

        /* Functions */
        function getCookie(cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') {c = c.substring(1);}
                if (c.indexOf(name) === 0) {return c.substring(name.length,c.length);}
            }
            return '';
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = 'expires='+d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        }


        (function(){
          function showPolicy(){
            $('.cookies').show();
          }
          if(parseInt(getCookie('wb_p')) !== 1){
            showPolicy();
            setCookie('wb_p', 1, 365);
            $('.cookies .close').click(function() {
              $('.cookies').fadeOut();
            })
          }
          window.setTimeout(function(){
             $('.header-filter').addClass('changed');
          }, 5000);
        })();

        // init material
        $.material.init();

        // init nav
        var myElement = document.querySelector('#main-nav');
        Headroom.options.offset = 70;
        var headroom  = new Headroom(myElement);
        headroom.init();

        // Do not delay load of page with async functionality: Wait for window load
        window.addEventListener('load',function(){

            // init smooth links
            $('a.smooth').click(function(e) {
                e.preventDefault();
                var $link = $(this);
                var anchor = $link.attr('href');
                $('html, body').stop().animate({
                    scrollTop : $(anchor).offset().top
                }, 500);
                return false;
            });

        }); // End of window load

    }); // End of jQuery context

})(); // End of use strict
