import { createNumbersArray } from '../common/utils.js';

export const renderTimescale = () => {
  const hoursOfDay = createNumbersArray(1, 23)
    .map(
      hour =>
        `<div class="time-slot">
        <span class="time-slot__time">${hour}:00</span></div>`
    )
    .join('');

  document.querySelector('.calendar__time-scale').innerHTML = hoursOfDay;
};
