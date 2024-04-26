import { getItem } from '../common/storage.js';
import { daysOfWeek, generateWeekRange } from '../common/utils.js';
import { openModal } from '../common/modal.js';

const calendarHeader = document.querySelector('.calendar__header');

export const renderHeader = () => {
  const headerWeek = generateWeekRange(getItem('displayedWeekStart'))
    .map(dayOfWeekNumber => {
      const isToday = dayOfWeekNumber.toDateString() === new Date().toDateString();
      const todayClassNumber = isToday ? 'today-number' : '';
      const todayClassName = isToday ? 'today-name' : '';
      return `<div class="calendar__day-label day-label">
    <span class="day-label__day-name ${todayClassName}">${daysOfWeek[
        dayOfWeekNumber.getDay()
      ].toUpperCase()}</span>
    <span class="day-label__day-number ${todayClassNumber}">${dayOfWeekNumber.getDate()}</span>
    </div>`;
    })
    .join('');

  calendarHeader.innerHTML = headerWeek;

  return headerWeek;
};

export const createEventBtn = document.querySelector('.create-event-btn');
createEventBtn.addEventListener('click', () => {
  document.querySelector('.event-form__submit-btn').textContent = 'Create';
  openModal();
});
