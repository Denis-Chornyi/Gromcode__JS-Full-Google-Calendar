import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/utils.js';
import { timeLine } from '../calendar/timeline.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

const renderCurrentMonth = () => {
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
};

setItem('displayedWeekStart', getStartOfWeek(new Date()));

const onChangeWeek = event => {
  const buttonElem = event.target.closest('button');
  if (!buttonElem) return;

  const { direction } = buttonElem.dataset;

  if (direction === 'today') {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
  } else if (direction === 'next') {
    getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() + 7);
  } else if (direction === 'prev') {
    getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() - 7);
  }

  renderWeek();
  renderHeader();
  renderCurrentMonth();
  timeLine();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};

navElem.addEventListener('click', onChangeWeek);
