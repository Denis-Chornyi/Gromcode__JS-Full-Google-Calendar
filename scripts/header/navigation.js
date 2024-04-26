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

const setInitialDisplayedWeekStart = () => {
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
};

const onChangeWeek = event => {
  const buttonElem = event.target.closest('button');
  if (!buttonElem) return;

  const { direction } = buttonElem.dataset;
  const displayedWeekStart = getItem('displayedWeekStart');

  switch (direction) {
    case 'today':
      setInitialDisplayedWeekStart();
      break;
    case 'next':
      displayedWeekStart.setDate(displayedWeekStart.getDate() + 7);
      break;
    case 'prev':
      displayedWeekStart.setDate(displayedWeekStart.getDate() - 7);
      break;
    default:
      return;
  }

  renderWeek();
  renderHeader();
  renderCurrentMonth();
  timeLine();
};

setInitialDisplayedWeekStart();

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};

navElem.addEventListener('click', onChangeWeek);
