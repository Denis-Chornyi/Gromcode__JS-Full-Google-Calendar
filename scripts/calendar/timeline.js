import { getDisplayedMonth, getStartOfWeek } from '../common/utils.js';

const displayedMonthElem = document.querySelector('.navigation__displayed-month');

export const timeLine = () => {
  const existingTimeLine = document.querySelector('.current-time');
  if (existingTimeLine) {
    existingTimeLine.remove();
  }

  const currentTimeEl = createCurrentTimeElement();
  const currentTimeSlot = findCurrentTimeSlot();

  if (currentTimeSlot) {
    currentTimeSlot.append(currentTimeEl);
  }
};

const createCurrentTimeElement = () => {
  const currentTimeEl = document.createElement('div');
  currentTimeEl.className = 'current-time';

  const circleElem = document.createElement('div');
  circleElem.className = 'current-time__circle';
  currentTimeEl.append(circleElem);

  const lineElem = document.createElement('div');
  lineElem.className = 'current-time__line';
  currentTimeEl.append(lineElem);

  currentTimeEl.dataset.time = new Date().getHours();
  currentTimeEl.dataset.day = new Date().getDate();
  currentTimeEl.dataset.month = getDisplayedMonth(getStartOfWeek(new Date()));
  currentTimeEl.style.top = `${new Date().getMinutes() - 2.5}px`;

  return currentTimeEl;
};

const findCurrentTimeSlot = () => {
  const getTimeSlots = document.querySelectorAll('.calendar__time-slot');
  const currentHour = new Date().getHours();
  return Array.from(getTimeSlots).find(slot => {
    const slotDay = slot.parentElement.dataset.day;
    return (
      slot.dataset.time === currentHour.toString() &&
      slotDay === new Date().getDate().toString() &&
      displayedMonthElem.innerHTML === getDisplayedMonth(getStartOfWeek(new Date()))
    );
  });
};

setInterval(timeLine, 1000 * 60);
