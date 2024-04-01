import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  event.preventDefault();
  let isEvent = event.target.classList.contains('event');
  if (!isEvent) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', event.target.dataset.eventId);
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
  const { start, end, title, id } = event;

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = start.getMinutes() + 'px';
  let eventHeight = end - start;
  eventHeight /= 60000;

  eventElem.style.height = eventHeight.toFixed() + 'px';
  eventElem.classList.add('event');

  const eventTitleElem = document.createElement('div');
  eventTitleElem.textContent = title;
  eventTitleElem.classList.add('event__title');

  const eventTimeElem = document.createElement('div');
  eventTimeElem.textContent = `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
  eventTimeElem.classList.add('event__time');
  eventElem.append(eventTitleElem, eventTimeElem);

  return eventElem;
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
};

export const renderEvents = () => {
  removeEventsFromCalendar();
  const events = getItem('events') || [];
  const startDateTime = getItem('displayedWeekStart');
  const endDateTime = shmoment(startDateTime).add('days', 7).result();
  events
    .filter(event => {
      return event.start >= startDateTime && event.end < endDateTime;
    })
    .forEach(event => {
      const { start } = event;
      const eventElem = createEventElement(event);
      const slotElem = document.querySelector(
        `.calendar__day[data-day="${start.getDate()}"] .calendar__time-slot[data-time="${start.getHours()}"]`
      );
      slotElem.append(eventElem, lineTime);
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
  const events = getItem('events');

  const eventIdToDelete = +getItem('eventIdToDelete');

  const newEventsArr = events.filter(event => event.id !== eventIdToDelete);
  setItem('events', newEventsArr);
  closePopup();
  renderEvents();
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
