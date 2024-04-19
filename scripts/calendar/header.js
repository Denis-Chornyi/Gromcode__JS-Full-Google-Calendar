import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';


const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const calendarHeader = document.querySelector('.calendar__header');
export const renderHeader = () => {
  const today = new Date();
  const headerWeek = generateWeekRange(getItem('displayedWeekStart'))
    .map(dayOfWeekNumber => {
      const isToday = dayOfWeekNumber.toDateString() === today.toDateString();
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
const createEventBtn = document.querySelector('.create-event-btn');
createEventBtn.addEventListener('click', openModal);
