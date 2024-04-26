const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: []
};

export const setItem = (key, value) => {
  Object.assign(storage, { [key]: value });
};

export const getItem = key => storage[key];

