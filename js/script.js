// ========== ПОПАП ==========
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openModalBtn = document.getElementById('open-modal-btn');

// Если все элементы попапа есть на странице — только тогда вешаем обработчики
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
        
        // Закрываем остальные
        document.querySelectorAll('.faq-item').forEach(function(item) {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Переключаем текущий
        faqItem.classList.toggle('active');
    });
});
// ========== АНИМАЦИЯ СЧЁТЧИКОВ ==========

// Шаг 2: Функция анимации одного числа
function animateNumber(element) {
  const target = Number(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  const suffix = element.dataset.suffix || ''
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      // Конец анимации — устанавливаем точное число
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      // Промежуточное значение — округлённое вниз
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Шаг 3: Функция проверки видимости элемента
function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Шаг 4: Запуск анимации при прокрутке
const statNumbers = document.querySelectorAll('.stat-number');
const aboutStats = document.querySelector('.about-stats');
let animated = false;

function checkScroll() {
  if (animated) return; // Уже анимировали — выходим
  
  if (isElementVisible(aboutStats)) {
    animated = true;
    statNumbers.forEach(function(element) {
      animateNumber(element);
    });
  }
}

// Вешаем обработчик прокрутки и сразу проверяем при загрузке
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

  // Рассчитываем индексы соседей с зацикливанием
  let leftIndex = currentSlide - 1;
  if (leftIndex < 0) leftIndex = total - 1;
  let rightIndex = currentSlide + 1;
  if (rightIndex >= total) rightIndex = 0;

  // Назначаем классы
  slides[currentSlide].classList.add('active');
  slides[leftIndex].classList.add('left');
  slides[rightIndex].classList.add('right');

  // Все остальные — hidden
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

// Инициализация
updateCarousel();