import { renderTimescale } from './calendar/timescale.js';
import { renderDecoration, renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/utils.js';
import { initEventForm } from './events/createEvent.js';
import { timeLine } from './calendar/timeline.js';
import { renderEvents } from './events/events.js';
import { setColorForEvent } from './events/eventsColor.js';
import {} from './events/eventsSlotHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  renderDecoration();
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  timeLine();
  renderEvents();
  setColorForEvent();
});
