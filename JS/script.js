// script.js — первый скрипт для нашего сайта

// Мы ищем элементы на странице по их id и сохраняем в переменные
// const — значит, переменная не будет меняться (константа)
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openModalBtn = document.getElementById('open-modal-btn');

// Если кнопка существует на странице, вешаем обработчик
if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
}
// Функция открытия попапа
function openModal() {
    modalOverlay.classList.add('active');
}

// Функция закрытия попапа
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Вешаем обработчик на кнопку закрытия (крестик)
modalClose.addEventListener('click', closeModal);

// Закрываем попап при клике на оверлей (тёмный фон за окном)
modalOverlay.addEventListener('click', function(event) {
    // event.target — элемент, по которому щёлкнули
    // Если щёлкнули именно по оверлею, а не по модальному окну внутри
    if (event.target === modalOverlay) {
        closeModal();
    }
});