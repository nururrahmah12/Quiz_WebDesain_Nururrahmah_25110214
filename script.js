function aman(namaKomponen, fn) {
    try {
        fn();
    } catch (err) {
        console.error('Gagal insialisasi' + namaKomponen + ':',err);
    }
}

document.addEventListener('DOMContentLoaded', function(){
   function pindahHalaman(namaHalaman) {
// Sembunyiokan Halaman
document.querySelectorAll('.page-view').forEach(function (el) {
    el.classList.remove('active');
});

//ta,pilkan halaman yang dipilih
const target = document.getElementById('page-' + namaHalaman);
if (target) target.classList.add('active');

//update class active di navbar ;ink
document.querySelectorAll('.nav-link-page').forEach (function (link) {
    const isActive = link.getAttribute('data-page') === namaHalaman;
    link.classList.toggle('active', isActive);
    link.classList.toggle('text-white', isActive);
    link.classList.toggle('text-white-50', !isActive);
});

//scroll ke atas setiap pindah halaman
window.scrollTo({ top: 0, behavior: 'instant'});

$('#navbarLinks'). collapse('hide');

if (namaHalaman === 'akademik') {
    setTimeout(function () {
        $('[data-spy="scroll"]').each(function () {
            $(this).scrollspy('refresh');
        });
    }, 50);
  }
}

//pasang event listener ke semua elemen yang punya data-page
document.querySelectorAll('[data-page]').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        pindahHalaman(this.getAttribute('data-page'));
         });
    }); 

        function initCarousel(carouselEl) {
    const inner = carouselEl.querySelector('.carousel-inner');
    if (!inner) return;
    const items = Array.from(inner.children);
    if (items.length === 0) return;
    const indicators = Array.from(carouselEl.querySelectorAll('.carousel-indicators li'));
    let currentIndex = items.findIndex(function (el) { return el.classList.contains('active'); });
    if (currentIndex < 0) currentIndex = 0;
    let isSliding = false;

    function updateIndicators(index) {
        indicators.forEach(function (li, i) {
            li.classList.toggle('active', i === index);
        });
    }

    function slideTo(newIndex, direction) {
        if (isSliding || newIndex === currentIndex) return;
        isSliding = true;

        const activeItem = items[currentIndex];
        const nextItem = items[newIndex];
        const dirClass = direction === 'next'? 'carousel-item-left' : 'carousel-item-right';
        const orderClass = direction === 'next'? 'carousel-item-next' : 'carousel-item-prev';

        nextItem.classList.add(orderClass);
        void nextItem.offsetHeight; // paksa reflow

        activeItem.classList.add(dirClass);
        nextItem.classList.add(dirClass);

        function selesai() {
            nextItem.classList.remove(orderClass, dirClass);
            nextItem.classList.add('active');
            activeItem.classList.remove('active', dirClass);
            activeItem.removeEventListener('transitionend', selesai);
            currentIndex = newIndex;
            updateIndicators(currentIndex);
            isSliding = false;
        }
        activeItem.addEventListener('transitionend', selesai);
        // Jaring pengaman: kalau event transitionend tidak terpicu
        // (misal elemen tidak sedang tampil), paksa selesai setelah 700ms.
        setTimeout(function () {
            if (isSliding) selesai();
        }, 700);
    }

    function next() {
        const newIndex = (currentIndex + 1) % items.length;
        slideTo(newIndex, 'next');
    }
    function prev() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        slideTo(newIndex, 'prev');
    }

    const prevBtn = carouselEl.querySelector('[data-slide="prev"]');
    const nextBtn = carouselEl.querySelector('[data-slide="next"]');
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.preventDefault(); prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.preventDefault(); next(); resetAutoplay(); });

    indicators.forEach(function (li, i) {
        li.addEventListener('click', function () {
            slideTo(i, i > currentIndex? 'next' : 'prev');
            resetAutoplay();
        });
    });

    const intervalMs = parseInt(carouselEl.getAttribute('data-interval'), 10) || 5000;
    let timer = null;

    function startAutoplay() {
        if (carouselEl.getAttribute('data-ride')!== 'carousel') return;
        timer = setInterval(next, intervalMs);
    }
    function stopAutoplay() {
        clearInterval(timer);
    }
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
}

aman('Carousel', function () {
    document.querySelectorAll('.carousel').forEach(initCarousel);
    });    
});



