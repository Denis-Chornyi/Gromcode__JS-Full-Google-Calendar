import { createEvent, getEvents, getItem, setItem, updateEvent } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

export const onCloseEventForm = () => {
  closeModal();
  eventFormElem.reset();
};

const onCreateEvent = event => {
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
};

export const initEventForm = () => {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
