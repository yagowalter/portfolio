/* ===========================================================
   Currículo, Tabs e Certificados
=========================================================== */

(function () {
    'use strict';

    /* =======================
       Tabs do Currículo
    ======================= */

    const resumeTab = document.querySelector('.resume-tabs');
    if (!resumeTab) return;

    const resumePortfolioTabBtns = resumeTab.querySelectorAll('.tab-btn');
    const resumeTabContents = document.querySelectorAll('.resume-tab-content');

    let certSwiper = null;

    function resumeTabNav(index) {
        resumeTabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        resumePortfolioTabBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        const activeContent = resumeTabContents[index];
        activeContent.style.display = 'flex';

        setTimeout(() => {
            activeContent.classList.add('active');

            // Atualiza o Swiper se existir
            if (certSwiper) {
                certSwiper.update();
                certSwiper.autoplay.start();
            }
        }, 100);

        resumePortfolioTabBtns[index].classList.add('active');
    }

    resumePortfolioTabBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => resumeTabNav(i));
    });

    /* =======================
       Ajuste automático dos títulos
    ======================= */

    function adjustTitles() {
        const cards = document.querySelectorAll('.cert-card');
        if (!cards.length) return;

        cards.forEach(card => {
            const title = card.querySelector('.cert-name');
            if (!title) return;

            title.style.fontSize = '';

            const comp = window.getComputedStyle(title);
            let fontSize = parseFloat(comp.fontSize) || 16;
            const lineHeight = parseFloat(comp.lineHeight) || fontSize * 1.2;

            const maxHeight = lineHeight * 2;
            const minFont = 12;
            let tries = 0;

            while (title.scrollHeight > maxHeight && fontSize > minFont && tries < 40) {
                fontSize--;
                title.style.fontSize = fontSize + 'px';
                tries++;
            }
        });
    }

    /* =======================
       Swiper Certificados
    ======================= */

    function initCarousel() {
        if (typeof Swiper === 'undefined') return;

        certSwiper = new Swiper('.cert-list', {
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

    /* =======================
       Resize debounce
    ======================= */

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustTitles, 180);
    });

    /* =======================
       Navegação suave por âncora
    ======================= */

    function initAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                history.pushState(null, '', href);
            });
        });
    }

    /* =======================
       Init geral
    ======================= */

    function onReady() {
        adjustTitles();
        setTimeout(adjustTitles, 350);
        initCarousel();
        initAnchors();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

})();
