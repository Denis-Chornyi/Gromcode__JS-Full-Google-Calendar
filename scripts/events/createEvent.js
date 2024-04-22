import { createEvent, getEvents, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  eventFormElem.reset();
}

export function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  event.preventDefault();
  const formDate = Array.from(new FormData(eventFormElem)).reduce((acc, field) => {
    const [name, value] = field;

    return {
      ...acc,
      [name]: value
    };
  }, {});
  const { date, startTime, endTime, title, description } = formDate;

  const newEvents = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    date: date
  };

  createEvent(newEvents)
    .then(() => getEvents())
    .then(newEventsList => {
      setItem('events', newEventsList);
      onCloseEventForm();
      renderEvents();
    });
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
