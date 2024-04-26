const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');
const colorList = document.querySelector('.events__colors');

export const openPopup = (x, y) => {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;
  colorList.style.top = `${y}px`;
  colorList.style.left = `${x + 135}px`;
};

export const closePopup = () => {
  popupElem.classList.add('hidden');
  colorList.style.display = 'none';
}

const onClickInsidePopup = (event) => {
  event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
