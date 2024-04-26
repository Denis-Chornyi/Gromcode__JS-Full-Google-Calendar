import { getItem } from '../common/storage.js';

const colors = [
  { color: 'Light blue', id: '#208ce4' },
  { color: 'Dark blue', id: '#015077' },
  { color: 'Grass green', id: '#63ad0e' },
  { color: 'Green', id: '#028c6a' },
  { color: 'Red', id: '#E81e25' },
  { color: 'Purple', id: '#632a7e' },
  { color: 'Orange', id: '#f26322' },
  { color: 'Dark yellow', id: '#fec804' }
];

const colorsEvents = document.querySelector('.events__colors');
const colorsList = document.querySelector('.events__colors-list');

export const setColorForEvent = () => {
  colors.forEach(({ color, id }) => {
    const colorsItem = createColorsListItem(color, id);
    colorsList.append(colorsItem);
  });
};

const createColorsListItem = (color, id) => {
  const colorsItem = document.createElement('li');
  colorsItem.className = 'events__colors-list-item';
  colorsItem.textContent = color;
  colorsItem.dataset.color = id;
  colorsItem.style.color = id;
  return colorsItem;
};

const toggleColor = (event) => {
  const colorItem = event.target.closest('.events__colors-list-item');
  if (!colorItem) return;

  const eventIdToDelete = getItem('eventIdToDelete');
  colorsEvents.dataset.id = eventIdToDelete;

  const selectedColor = colors.find((color) => color.id === colorItem.dataset.color);

  const eventsToUpdate = document.querySelectorAll('.event');
  eventsToUpdate.forEach((event) => {
    if (event.dataset.eventId === eventIdToDelete) {
      event.style.backgroundColor = selectedColor.id;
    }
  });
};

colorsList.addEventListener('click', toggleColor);

const openColorsList = () => {
  colorsEvents.style.display = 'block';
};

document.querySelector('.events__colors-btn').addEventListener('click', openColorsList);
