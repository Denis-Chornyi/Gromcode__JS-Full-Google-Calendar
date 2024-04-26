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
  colors.map(({ color, id }) => {
    const colorsItem = document.createElement('li');
    colorsItem.className = 'events__colors-list-item';
    colorsItem.textContent = color;
    colorsItem.dataset.color = id;
    colorsItem.style.color = id;
    colorsList.append(colorsItem);
  });
};

const toggleColor = e => {
  const isColorItem = e.target.closest('.events__colors-list-item');
  if (!isColorItem) return;

  colorsEvents.dataset.id = getItem('eventIdToDelete');
  const listData = colors.find(elem => elem.id === e.target.dataset.color);

  [...document.querySelectorAll('.event')].map(event => {
    if (event.dataset.eventId === getItem('eventIdToDelete')) {
      event.style.backgroundColor = listData.id;
    }
  });
};
colorsList.addEventListener('click', toggleColor);

const openColorsList = () => {
  colorsEvents.style.display = 'block';
};

document.querySelector('.events__colors-btn').addEventListener('click', openColorsList);
