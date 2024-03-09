import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

function clearEventForm() {
  eventFormElem.reset();
  // ф-ция должна очистить поля формы от значений
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
  // здесь нужно закрыть модальное окно и очистить форму
}

function onCreateEvent(event) {
  event.preventDefault();
  const formDate = Array.from(new FormData(eventFormElem)).reduce(
    (acc, field) => {
      const [name, value] = field;

      return {
        ...acc,
        [name]: value,
      };
    },
    {}
  );
  const { date, startTime, endTime, title, description } = formDate;
  const events = getItem("events") || [];
  const newEvents = events.concat({
    id: Math.random(),
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
  });
  setItem("events", newEvents);
  onCloseEventForm();
  renderEvents();
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  eventFormElem.addEventListener("submit", onCreateEvent);
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
  // подпишитесь на сабмит формы и на закрытие формы
}
