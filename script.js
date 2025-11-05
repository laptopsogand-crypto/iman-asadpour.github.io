// === بازدیدکننده ===
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount = parseInt(visitCount) + 1;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visitCount').textContent = visitCount.toLocaleString();

// === منوی موبایل ===
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// === اسلایدر اصلی (بالای متن) ===
let currentSlide = 0;
const slides = document.querySelectorAll('.slider .slide');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

let autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);

// === فیلتر آگهی‌ها (همه، آپارتمان، ویلا، تجاری) — رفع باگ ===
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
        // دکمه فعال
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.property-card');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// === گالری داخل کارت آگهی‌ها ===
document.querySelectorAll('.property-gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-image');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    let currentIndex = 0;

    function showImage(n) {
        images[currentIndex].classList.remove('active');
        currentIndex = (n + images.length) % images.length;
        images[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
});

// === مودال مشاهده آگهی ===
document.querySelectorAll('.view-ad').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.property-card');
        const images = card.querySelectorAll('.gallery-image');
        const modal = document.getElementById('property-modal');
        const modalImg = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const modalPricePerMeter = document.getElementById('modal-price-per-meter');
        const modalFeatures = document.getElementById('modal-features');
        const modalDesc = document.getElementById('modal-description');

        modalTitle.textContent = card.querySelector('h3').textContent;
        modalPrice.textContent = card.querySelector('.price').textContent;
        modalPricePerMeter.textContent = card.querySelector('.price-per-meter').textContent;
        modalFeatures.innerHTML = card.querySelector('.features').innerHTML;
        modalDesc.textContent = card.querySelector('.description').textContent;

        modalImg.src = images[0].src;
        modalImg.dataset.index = 0;
        modal.style.display = 'flex';

        // گالری داخل مودال
        document.querySelectorAll('#property-modal .modal-prev, #property-modal .modal-next').forEach(mbtn => {
            mbtn.onclick = function() {
                let idx = parseInt(modalImg.dataset.index);
                if (this.classList.contains('modal-prev')) {
                    idx = (idx - 1 + images.length) % images.length;
                } else {
                    idx = (idx + 1) % images.length;
                }
                modalImg.src = images[idx].src;
                modalImg.dataset.index = idx;
            };
        });
    });
});

// بستن مودال
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('property-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('property-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// === بیشتر / کمتر توضیحات (رفع چسبیدن حروف) ===
document.querySelectorAll('.toggle-desc').forEach(btn => {
    btn.addEventListener('click', function() {
        const wrapper = this.closest('.description-wrapper');
        wrapper.classList.toggle('expanded');
        this.innerHTML = wrapper.classList.contains('expanded') 
            ? 'کمتر <i class="fas fa-chevron-up"></i>' 
            : 'بیشتر <i class="fas fa-chevron-down"></i>';
    });
});

// === فرم تماس ===
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.');
    this.reset();
});

// === انیمیشن ستاره‌ها ===
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1
    };
}

function initStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(createStar());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('load', () => {
    resizeCanvas();
    initStars();
    animateStars();
});

window.addEventListener('resize', resizeCanvas);
