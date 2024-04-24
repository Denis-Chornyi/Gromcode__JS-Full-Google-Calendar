import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

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
  const slotOfDecoration = createNumbersArray(1, 8)
    .map(num => `<div class="calendar__week-decoration-slot" data-number="${num}"></div>`)
    .join('');
  document.querySelector('.calendar__week-decoration').innerHTML = slotOfDecoration;

  const slotDecoration = document.querySelector('.calendar__week-decoration-slot');
  if (slotDecoration.dataset.number === '1') {
    slotDecoration.textContent = 'GMT+02';
  }
};
// export const timeSlot = event => {
//   const isTimeSlot = event.target.closest('.calendar__time-slot');
//   console.log(isTimeSlot);
//   if (!isTimeSlot) {
//     return;
//   }
//   openModal();
// };
// document.querySelector('.calendar__week').addEventListener('click', timeSlot);
