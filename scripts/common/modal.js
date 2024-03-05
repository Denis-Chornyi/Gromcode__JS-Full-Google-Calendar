const modalElem = document.querySelector(".modal");
const modalContentElem = document.querySelector(".modal__content");
const createEventBtn = document.querySelector(".create-event-btn");
const createEventCloseBtn = document.querySelector(".create-event__close-btn");

export const openModal = () => {
  modalElem.style.display = "flex";
};

export const closeModal = () => {
  modalElem.style.display = "none";
};
// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
createEventBtn.addEventListener("click", openModal);

createEventCloseBtn.addEventListener("click", closeModal);
