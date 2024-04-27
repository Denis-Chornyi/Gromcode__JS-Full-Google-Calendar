const baseUrl = 'https://6613d8a753b0d5d80f6885e7.mockapi.io/api/v7/events';

export const getEvents = () =>
  fetch(baseUrl)
    .then(response => response.json())
    .catch(() => alert('Internal Server Error'));

export const createEvent = eventData =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(eventData)
  });

export const updateEvent = (eventId, updatedEventData) =>
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

export const getEventById = eventId =>
  fetch(`${baseUrl}/${eventId}`).then(response => response.json());

export const updateEventColor = (eventId, colorId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ colorId })
  });
};
