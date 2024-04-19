import { deleteEvent, getEvents, getItem, setItem, updatedEvent } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { closeModal, createEventCloseBtn, openModal } from '../common/modal.js';
import { getDateTime } from '../common/time.utils.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const updateEventBtn = document.querySelector('.updated__event-btn');

function handleEventClick(event) {
  event.preventDefault();
  let isEvent = event.target.closest('.event');
  if (!isEvent) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', isEvent.dataset.eventId);
}
function removeEventsFromCalendar() {
  const eventsElems = document.querySelectorAll('.event');
  if (eventsElems) {
    eventsElems.forEach(eventElem => eventElem.remove());
  }
}

const createEventElement = event => {
  const { start, end, title, id, description } = event;

  const startDate = new Date(start);
  const endDate = new Date(end);
  moment(startDate).format('HH:mm');
  moment(endDate).format('HH:mm');
  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = startDate.getMinutes() + 'px';
  let eventHeight = endDate - startDate;
  eventHeight /= 60000;

  eventElem.style.height = eventHeight.toFixed() + 'px';
  eventElem.classList.add('event');

  const eventTitleElem = document.createElement('div');
  eventTitleElem.textContent = title;
  eventTitleElem.classList.add('event__title');

  const eventTimeElem = document.createElement('div');

  eventTimeElem.textContent = `${moment(startDate).format('HH:mm')} - ${moment(endDate).format(
    'HH:mm'
  )}`;
  eventTimeElem.classList.add('event__time');

  const eventDescriptionElem = document.createElement('div');
  eventDescriptionElem.textContent = description;
  eventDescriptionElem.classList.add('event__description');

  eventElem.append(eventTitleElem, eventTimeElem, eventDescriptionElem);

  return eventElem;
};

export const renderEvents = async () => {
  removeEventsFromCalendar();

  const startDateTime = getItem('displayedWeekStart');
  const endDateTime = shmoment(startDateTime).add('days', 7).result();
  const newEvents = await getEvents();
  setItem('events', newEvents);

  newEvents
    .filter(event => {
      return new Date(event.start) >= startDateTime && new Date(event.end) < endDateTime;
    })
    .forEach(event => {
      const { start } = event;
      const eventElem = createEventElement(event);
      const slotElem = document.querySelector(
        `.calendar__day[data-day="${new Date(
          start
        ).getDate()}"] .calendar__time-slot[data-time="${new Date(start).getHours()}"]`
      );
      slotElem.append(eventElem);
    });
};
function onDeleteEvent() {
  const eventIdToDelete = +getItem('eventIdToDelete');
  deleteEvent(eventIdToDelete)
    .then(() => getEvents())
    .then(newEventsArr => {
      setItem('events', newEventsArr);
      closePopup();
      renderEvents();
    });
}

const eventFormElem = document.querySelector('.event-form');

function onUpdateEvent() {
  const eventIdToDelete = +getItem('eventIdToDelete');
  openModal();
  closePopup();

  const formDate = Array.from(new FormData(eventFormElem)).reduce((acc, field) => {
    const [name, value] = field;

    return {
      ...acc,
      [name]: value
    };
  }, {});
  const { date, startTime, endTime, title, description } = formDate;

  const updateEvent = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime)
  };

  updatedEvent(eventIdToDelete, updateEvent)
    .then(() => getEvents())
    .then(updatedEventArr => {
      closePopup();
      setItem('events', updatedEventArr);
      renderEvents();
    });
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

updateEventBtn.addEventListener('click', onUpdateEvent);
