// ========== ПОПАП ==========
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openModalBtn = document.getElementById('open-modal-btn');

if (modalOverlay && modalClose && openModalBtn) {
    function openModal() {
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    openModalBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

// ========== FAQ-АККОРДЕОН ==========
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;

        document.querySelectorAll('.faq-item').forEach(function(item) {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        faqItem.classList.toggle('active');
    });
});

// ========== АНИМАЦИЯ СЧЁТЧИКОВ ==========
function animateNumber(element) {
  const target = Number(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  const suffix = element.dataset.suffix || '';
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

const statNumbers = document.querySelectorAll('.stat-number');
const aboutStats = document.querySelector('.about-stats');
let animated = false;

function checkScroll() {
  if (animated) return;

  if (isElementVisible(aboutStats)) {
    animated = true;
    statNumbers.forEach(function(element) {
      animateNumber(element);
    });
  }
}

window.addEventListener('scroll', checkScroll);
checkScroll();

// ========== КАРУСЕЛЬ ОТЗЫВОВ ==========
const slides = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function updateCarousel() {
  const total = slides.length;
  slides.forEach(slide => {
    slide.classList.remove('left', 'active', 'right', 'hidden');
  });

  let leftIndex = currentSlide - 1;
  if (leftIndex < 0) leftIndex = total - 1;
  let rightIndex = currentSlide + 1;
  if (rightIndex >= total) rightIndex = 0;

  slides[currentSlide].classList.add('active');
  slides[leftIndex].classList.add('left');
  slides[rightIndex].classList.add('right');

  slides.forEach((slide, index) => {
    if (index !== currentSlide && index !== leftIndex && index !== rightIndex) {
      slide.classList.add('hidden');
    }
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= slides.length) currentSlide = 0;
  updateCarousel();
});

updateCarousel();

// ========== БУРГЕР-МЕНЮ ==========
const burger = document.getElementById('burger');
const navbarMenu = document.querySelector('.navbar-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Закрываем меню при клике на любую ссылку внутри него
navbarMenu.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});     