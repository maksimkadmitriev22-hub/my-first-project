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