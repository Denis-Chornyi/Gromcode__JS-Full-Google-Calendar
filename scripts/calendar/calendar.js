import { getItem } from '../common/storage.js';
import { createNumbersArray, generateWeekRange } from '../common/utils.js';
import { renderEvents } from '../events/events.js';

const generateDay = () => {
  const hoursOfDay = createNumbersArray(0, 23)
    .map(
      timeSlot =>
        `<div class="calendar__time-slot"
        data-time="${timeSlot}">   
          </div>`
    )
    .join('');
  return hoursOfDay;
};

export const renderWeek = () => {
  const startDate = getItem('displayedWeekStart');
  const daysList = generateWeekRange(startDate);
  const dayTemplateString = generateDay();
  const weekElementString = daysList
    .map(day => `<div class="calendar__day" data-day="${day.getDate()}">${dayTemplateString}</div>`)
    .join('');

  document.querySelector('.calendar__week').innerHTML = weekElementString;
  renderEvents();
};

export const renderDecoration = () => {
  const slotOfDecoration = createNumbersArray(1, 8).map(num => {
    const slot = document.createElement('div');
    slot.classList.add('calendar__week-decoration-slot');
    slot.dataset.number = num;
    return slot;
  });

  const decorationContainer = document.querySelector('.calendar__week-decoration');
  slotOfDecoration.forEach(slot => {
    decorationContainer.appendChild(slot);
    if (slot.dataset.number === '1') {
      slot.textContent = 'GMT+02';
    }
  });
};
