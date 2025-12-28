(function(){
    'use strict';

    // Ajusta tamanho do título das cartas de certificado para caber em 2 linhas
    function adjustTitles(){
        var cards = document.querySelectorAll('.cert-card');
        if(!cards || !cards.length) return;

        cards.forEach(function(card){
            var title = card.querySelector('.cert-name');
            if(!title) return;

            title.style.fontSize = '';

            var comp = window.getComputedStyle(title);
            var fontSize = parseFloat(comp.fontSize) || 16;
            var lineHeight = parseFloat(comp.lineHeight) || (fontSize * 1.2);

            var maxLines = 2;
            var maxHeight = lineHeight * maxLines;

            if(title.scrollHeight <= maxHeight) return;

            var minFont = 12; // px
            var tries = 0;
            while(title.scrollHeight > maxHeight && fontSize > minFont && tries < 40){
                fontSize = Math.max(minFont, fontSize - 1);
                title.style.fontSize = fontSize + 'px';
                tries++;
            }
        });
    }

    // Carousel de certificados (inicia Swiper se disponível)
    function initCarousel() {
        if (typeof Swiper === 'undefined') return;

        new Swiper('.cert-list', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            freeMode: true,
            speed: 5000,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }

    var _t;
    window.addEventListener('resize', function(){
        clearTimeout(_t);
        _t = setTimeout(adjustTitles, 180);
    });

    function onReady(){
        adjustTitles();
        setTimeout(adjustTitles, 350);
        initCarousel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

})();
