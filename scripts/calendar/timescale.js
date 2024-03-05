import { createNumbersArray } from "../common/createNumbersArray.js";

export const renderTimescale = () => {
  const hoursOfDay = createNumbersArray(1, 24)
    .map(
      (hour) =>
        `<div class="time-slot">
        <span class"time-slot__time">${hour}</span></div>`
    )
    .join("");
  document.querySelector(".calendar__time-scale").innerHTML = hoursOfDay;
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
};
