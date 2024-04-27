import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { openModal } from '../common/modal.js';
import { deleteEvent, getEventById, getEvents } from '../common/gateways.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
export const editEventBtn = document.querySelector('.edit__event-btn');

const handleEventClick = event => {
  event.preventDefault();
  let isEvent = event.target.closest('.event');
  if (!isEvent) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', isEvent.dataset.eventId);
};

const removeEventsFromCalendar = () => {
  const eventsElems = document.querySelectorAll('.event');
  if (eventsElems) {
    eventsElems.forEach(eventElem => eventElem.remove());
  }
};

export const createEventElement = event => {
  const { start, end, title, id, description, colorId } = event;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = startDate.getMinutes() + 'px';
  eventElem.style.height = ((endDate - startDate) / 60000).toFixed() + 'px';
  eventElem.classList.add('event');
  eventElem.style.backgroundColor = colorId;

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

  const startDateTime = new Date(getItem('displayedWeekStart'));
  const endDateTime = shmoment(startDateTime).add('days', 7).result();
  const newEvents = await getEvents();
  setItem('events', newEvents);

  newEvents.forEach(event => {
    const eventStart = new Date(event.start);

    if (eventStart >= startDateTime && eventStart < endDateTime) {
      const eventElem = createEventElement(event);
      const day = eventStart.getDate();
      const hour = eventStart.getHours();

      const daySelector = `.calendar__day[data-day="${day}"]`;
      const slotSelector = `${daySelector} .calendar__time-slot[data-time="${hour}"]`;

      const slotElem = document.querySelector(slotSelector);

      if (slotElem) {
        slotElem.append(eventElem);
      }
    }
  });
};

const onDeleteEvent = () => {
  const eventIdToDelete = +getItem('eventIdToDelete');

  deleteEvent(eventIdToDelete)
    .then(() => getEvents())
    .then(newEventsArr => {
      setItem('events', newEventsArr);
      closePopup();
      renderEvents();
    });
};

export const setEventById = async () => {
  const eventIdToDelete = +getItem('eventIdToDelete');

  closePopup();

  const getInputValues = document.querySelectorAll('.event-form__field');
  const [titleInput, dateInput, startTimeInput, endTimeInput, descriptionInput] = getInputValues;

  const eventFromStorage = await getEventById(eventIdToDelete);

  if (!eventFromStorage) {
    return;
  }

  openModal();

  const { date, title, description, start, end } = eventFromStorage;

  const startTimeNeeded = moment(start).format('HH:mm');
  const endTimeNeeded = moment(end).format('HH:mm');
  const dateNeeded = moment(date).format('YYYY-MM-DD');

  titleInput.value = title;
  descriptionInput.value = description;
  startTimeInput.value = startTimeNeeded;
  endTimeInput.value = endTimeNeeded;
  dateInput.value = dateNeeded;
};

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

editEventBtn.addEventListener('click', () => {
  setEventById();
  document.querySelector('.event-form__submit-btn').textContent = 'Edit';
});

// const displaySlotData = slotData => {
//   closePopup();
//   openModal();

//   const getInputValues = document.querySelectorAll('.event-form__field');
//   const [titleInput, dateInput, startTimeInput, endTimeInput, descriptionInput] = getInputValues;
//   const weekDay = document.querySelector('.day-label__day-number')
//   console.log(weekDay.innerHTML)

//   const { date, startTime, endTime } = slotData;
//   date = `${weekDay.innerHTML}`
//   const startTimeFormatted = moment(startTime).format('HH:mm');
//   const endTimeFormatted = moment(endTime).format('HH:mm');
//   const dateFormatted = moment(date).format('YYYY-MM-DD');

//   // Устанавливаем значения в поля формы
//   titleInput.value = ''; // Очищаем поле заголовка, чтобы пользователь мог ввести новый заголовок
//   descriptionInput.value = ''; // Очищаем поле описания, чтобы пользователь мог ввести новое описание
//   startTimeInput.value = startTimeFormatted;
//   endTimeInput.value = endTimeFormatted;
//   dateInput.value = dateFormatted;
// };

// // Пример использования: При клике на слот календаря вызываем функцию displaySlotData и передаем данные о слоте
// const calendarWeek = document.querySelector('.calendar__week');

// const getSlotInform = event => {
//   const slot = event.target.closest('.calendar__time-slot');
//   if (!slot) return;

//   const slotData = {
//     date: slot.dataset.date,
//     startTime: slot.dataset.startTime,
//     endTime: slot.dataset.endTime
//   };

//   displaySlotData(slotData);
// };

// calendarWeek.addEventListener('click', getSlotInform)
