import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import { timeLine } from '../calendar/timeline.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}
setItem('displayedWeekStart', getStartOfWeek(new Date()));
const onChangeWeek = event => {
  const buttonElem = event.target.closest('button');
  try {
    const { direction } = buttonElem.dataset;
    if (direction === 'today') {
      setItem('displayedWeekStart', getStartOfWeek(new Date()));
    } else if (direction === 'next') {
      getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() + 7);
    } else if (direction === 'prev') {
      getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() - 7);
    }
  } catch (err) {
    return;
  }

  renderWeek();
  renderHeader();
  renderCurrentMonth();
  timeLine();

  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};
export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
navElem.addEventListener('click', onChangeWeek);
