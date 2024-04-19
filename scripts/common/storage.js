let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: []
  // это все данные, которые вам нужно хранить для работы приложения
};
export const setItem = (key, value) => {
  Object.assign(storage, { [key]: value });
  // ф-ция должна устанавливать значения в объект storage
};
export const getItem = key => storage[key];
// ф-ция должна возвращать по ключу значения из объекта storage

// пример объекта события
const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z')
};
const baseUrl = 'https://6613d8a753b0d5d80f6885e7.mockapi.io/api/v7/events';

const mapEvent = events => events.map(({ id, ...rest }) => ({ ...rest, id: id }));

export const getEvents = () =>
  fetch(baseUrl)
    .then(response => response.json())
    .then(events => mapEvent(events))
    .catch(err => alert('Internal Server Error'));

export const createEvent = eventData =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(eventData)
  });

export const updatedEvent = (eventId, updatedEventData) =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(updatedEventData)
  });

export const deleteEvent = eventId =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE'
  });
