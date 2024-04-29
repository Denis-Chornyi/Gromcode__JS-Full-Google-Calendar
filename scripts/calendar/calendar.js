import { getItem } from '../common/storage.js';
import { createNumbersArray, generateWeekRange, getStartOfWeek } from '../common/utils.js';
import { renderEvents } from '../events/events.js';

const getWeekElem = document.querySelector('.calendar__week');

export const renderWeek = () => {
  const getDatesRange = generateWeekRange(new Date(getStartOfWeek(getItem('displayedWeekStart'))));

  const result = getDatesRange.map(dayNumb => {
    const newDivForDay = document.createElement('div');
    newDivForDay.classList.add('calendar__day');
    newDivForDay.dataset.day = dayNumb.getDate();

    const newSlots = createNumbersArray(0, 23).map(timeNumber => {
      const newTimeSlotEL = document.createElement('div');
      newTimeSlotEL.classList.add('calendar__time-slot');
      newTimeSlotEL.setAttribute('data-time', timeNumber);

     
      newTimeSlotEL.setAttribute('data-day', dayNumb.getDate());
      newTimeSlotEL.setAttribute('data-month', dayNumb.getMonth() + 1); 
      newTimeSlotEL.setAttribute('data-year', dayNumb.getFullYear());

      newTimeSlotEL.innerText = ``;
      return newTimeSlotEL;
    });

    newDivForDay.append(...newSlots);
    return newDivForDay;
  });

  getWeekElem.innerHTML = '';
  getWeekElem.prepend(...result);
  renderEvents();
};

export const renderDecoration = () => {
  const slotOfDecoration = createNumbersArray(1, 8)
    .map(num => `<div class="calendar__week-decoration-slot" data-number="${num}"></div>`)
    .join('');
  document.querySelector('.calendar__week-decoration').innerHTML = slotOfDecoration;

  const slotDecoration = document.querySelector('.calendar__week-decoration-slot');
  if (slotDecoration.dataset.number === '1') {
    slotDecoration.textContent = 'GMT+02';
  }
};
