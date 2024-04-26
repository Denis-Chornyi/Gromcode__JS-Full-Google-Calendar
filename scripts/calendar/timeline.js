import { getDisplayedMonth, getStartOfWeek } from '../common/utils.js';

const displayedMonthElem = document.querySelector('.navigation__displayed-month');

export const timeLine = () => {
  const isTimeLine = document.querySelector('.current-time');
  if (isTimeLine) {
    isTimeLine.remove();
  }

  const currentTimeEl = document.createElement('div');
  currentTimeEl.className = 'current-time';

  const circleElem = document.createElement('div');
  circleElem.className = 'current-time__circle';
  currentTimeEl.append(circleElem);

  const lineElem = document.createElement('div');
  lineElem.className = 'current-time__line';
  currentTimeEl.append(lineElem);

  const getTimeSlots = document.querySelectorAll('.calendar__time-slot');

  currentTimeEl.dataset.time = new Date().getHours();
  currentTimeEl.dataset.day = new Date().getDate();
  currentTimeEl.dataset.month = getDisplayedMonth(getStartOfWeek(new Date()));

  currentTimeEl.style.top = `${new Date().getMinutes() - 2.5}px`;

  return getTimeSlots.forEach(slot => {
    const slotDay = slot.parentElement.dataset.day;
    if (
      slot.dataset.time === currentTimeEl.dataset.time &&
      slotDay === currentTimeEl.dataset.day &&
      displayedMonthElem.innerHTML === currentTimeEl.dataset.month
    ) {
      slot.append(currentTimeEl);
    }
  });
};

setInterval(timeLine, 1000 * 60);
