import { updateEventColor } from '../common/gateways.js';
import { getItem } from '../common/storage.js';

import { renderEvents } from './events.js';

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

export const colorsEvents = document.querySelector('.events-colors');
const colorsList = document.querySelector('.events-colors__list');

export const setColorForEvent = () => {
  colors.forEach(({ color, id }) => {
    const colorsItem = createColorsListItem(color, id);
    colorsList.append(colorsItem);
  });
};

const createColorsListItem = (color, id) => {
  const colorsItem = document.createElement('li');
  colorsItem.className = 'events-colors__list-item';
  colorsItem.textContent = color;
  colorsItem.dataset.color = id;
  colorsItem.style.color = id;
  return colorsItem;
};

const toggleColor = event => {
  const colorItem = event.target.closest('.events-colors__list-item');
  if (!colorItem) return;

  const eventIdToDelete = getItem('eventIdToDelete');
  colorsEvents.dataset.id = eventIdToDelete;

  const selectedColorId = colorItem.dataset.color;

  updateEventColor(+eventIdToDelete, selectedColorId)
    .then(() => {
      const eventsToUpdate = document.querySelectorAll(
        `.event[data-event-id=" ${eventIdToDelete} "]`
      );
      eventsToUpdate.forEach(eventToUpdate => {
        eventToUpdate.style.backgroundColor = selectedColorId;
      });
      renderEvents();
    })
    .catch(error => {
      console.error('Failed to update the event color:', error);
    });
};

colorsList.addEventListener('click', toggleColor);

const openColorsList = () => {
  colorsEvents.style.display = 'block';
};

document.querySelector('.events-colors__btn').addEventListener('click', openColorsList);
