import {
  createEvent,
  getEventById,
  getEvents,
  getItem,
  setItem,
  updateEvent
} from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal, openModal } from '../common/modal.js';
import { createEventBtn } from '../calendar/header.js';

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
  if (document.querySelector('.event-form__submit-btn').textContent === 'Create') {
    createEvent(newEvents)
      .then(() => getEvents())
      .then(newEventsList => {
        setItem('events', newEventsList);
        onCloseEventForm();
        renderEvents();
      });
  } else {
    const eventIdToDelete = +getItem('eventIdToDelete');

    updateEvent(eventIdToDelete, newEvents)
      .then(() => getEvents())
      .then(newEventsList => {
        setItem('events', newEventsList);
        onCloseEventForm();
        renderEvents();
      });
  }
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
