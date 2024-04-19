let storage = {
  eventIdToDelete: null,

  displayedWeekStart: null,

  events: []
};
export const setItem = (key, value) => {
  Object.assign(storage, { [key]: value });
};
export const getItem = key => storage[key];

const eventExample = {
  id: 0.7520027086457333,
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
