import { renderTimescale } from './calendar/timescale.js';
import { renderWeek, renderDecoration } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { timeLine } from './calendar/timeline.js';
import { renderEvents } from './events/events.js';

document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderDecoration();
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  timeLine();
  renderEvents();
});
