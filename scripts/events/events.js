import { deleteEvent, getEvents, getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  event.preventDefault();
  let isEvent = event.target.closest('.event');
  if (!isEvent) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', isEvent.dataset.eventId);
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
}
function removeEventsFromCalendar() {
  const eventsElems = document.querySelectorAll('.event');
  if (eventsElems) {
    eventsElems.forEach(eventElem => eventElem.remove());
  }
  // ф-ция для удаления всех событий с календаря
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
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
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

  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
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

  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
