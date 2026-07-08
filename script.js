// 1. EFEK TRANSISI HEADER SAAT DI-SCROLL
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});

// 2. LOGIKA UTAMA MENU MOBILE & DETEKSI KLIK LUAR AREA
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('header nav');

    if (menuToggle && navMenu) {
        // Event buka/tutup menu saat tombol hamburger diklik
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Menahan gelembung event klik
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Otomatis tutup menu jika link di dalam menu navigasi diklik
        const navLinks = document.querySelectorAll('header nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // FIX DETEKSI KLIK AREA LUAR (VARIABEL SINKRON)
        document.addEventListener('click', function(event) {
            const diDalamMenu = navMenu.contains(event.target);
            const diDalamTombol = menuToggle.contains(event.target);
            
            if (navMenu.classList.contains('active') && !diDalamMenu && !diDalamTombol) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 3. LOGIKA SLIDER BANNER HERO
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Pengaman: Jika halaman tidak memiliki slider (seperti halaman tentang/layanan), hentikan fungsi slider di bawah
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000;
    let sliderTimer = setInterval(handleNextSlide, slideInterval);

    function updateSliderDisplay() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function handleNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderDisplay();
    }

    function handlePrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderDisplay();
    }

    function resetTimer() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(handleNextSlide, slideInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            handleNextSlide();
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            handlePrevSlide();
            resetTimer();
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                updateSliderDisplay();
                resetTimer();
            });
        });
    }
});
