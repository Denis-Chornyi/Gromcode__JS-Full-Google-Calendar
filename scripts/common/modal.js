const modalElem = document.querySelector('.modal');
const createEventCloseBtn = document.querySelector('.create-event__close-btn');

export const openModal = () => {
  modalElem.style.display = 'flex';
};

export const closeModal = () => {
  modalElem.style.display = 'none';
};

createEventCloseBtn.addEventListener('click', closeModal);
