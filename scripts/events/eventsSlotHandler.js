import { openModal } from '../common/modal.js';

const displaySlotData = slotData => {
  openModal();

  const getInputValues = document.querySelectorAll('.event-form__field');
  const [titleInput, dateInput, startTimeInput, endTimeInput, descriptionInput] = getInputValues;

  const { date, startTime, endTime } = slotData;
  
  const startTimeFormatted = moment(startTime, 'HH:mm').format('HH:mm');
  const endTimeFormatted = moment(endTime, 'HH:mm').format('HH:mm');
  const dateFormatted = date.toString()

  titleInput.value = '';
  descriptionInput.value = '';
  startTimeInput.value = startTimeFormatted;
  endTimeInput.value = endTimeFormatted;
  dateInput.value = dateFormatted;
};

const getSlotInform = event => {
  const slot = event.target.closest('.calendar__time-slot');
  if (!slot) return;

  const startTime = slot.dataset.time;
  const endTime = moment(startTime, 'HH:mm').add(1, 'hour').format('HH:mm');

  const year = slot.dataset.year;
  const month = String(slot.dataset.month).padStart(2, '0');
  const day = String(slot.dataset.day).padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  const slotData = { date, startTime, endTime };
  displaySlotData(slotData);
  document.querySelector('.event-form__submit-btn').textContent = 'Create';
};

const handleCalendarClick = event => {
  const eventElement = event.target.closest('.event');
  if (eventElement) {
    return;
  }

  getSlotInform(event);
};

const calendarWeek = document.querySelector('.calendar__week');

calendarWeek.addEventListener('click', handleCalendarClick);
