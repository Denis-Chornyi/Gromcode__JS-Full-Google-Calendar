import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}
const todayBtn = document.querySelector('.navigation__today-btn');
setItem('displayedWeekStart', getStartOfWeek(new Date()));
const calendarToday = () => {
  if (todayBtn) {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }
};
todayBtn.addEventListener('click', calendarToday);
const onChangeWeek = event => {
  const isList = event.target.classList.contains('navigation__nav-icon');
  if (!isList) {
    return;
  }
  if (event.target.classList.contains('icon-button-right')) {
    getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() + 7);
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }
  if (event.target.classList.contains('icon-button-left')) {
    getItem('displayedWeekStart').setDate(getItem('displayedWeekStart').getDate() - 7);
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }

  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};
export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
navElem.addEventListener('click', onChangeWeek);
