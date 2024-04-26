import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/utils.js';
import { closeModal } from '../common/modal.js';
import { createEvent, getEvents, updateEvent } from '../common/gateways.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

export const onCloseEventForm = () => {
  closeModal();
  eventFormElem.reset();
};

const onCreateEvent = event => {
  event.preventDefault();
  const formDate = Object.fromEntries(new FormData(eventFormElem));
  const { date, startTime, endTime, title, description } = formDate;

  const newEvents = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    date
  };

  const action =
    document.querySelector('.event-form__submit-btn').textContent === 'Create'
      ? createEvent(newEvents)
      : updateEvent(+getItem('eventIdToDelete'), newEvents);

  action
    .then(() => getEvents())
    .then(newEventsList => {
      setItem('events', newEventsList);
      onCloseEventForm();
      renderEvents();
    });
};

export const initEventForm = () => {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
