const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');
export const createEventCloseBtn = document.querySelector('.create-event__close-btn');

export const openModal = () => {
  modalElem.style.display = 'flex';
};

export const closeModal = () => {
  modalElem.style.display = 'none';
};

createEventCloseBtn.addEventListener('click', closeModal);
