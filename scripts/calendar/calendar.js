import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

const generateDay = () => {
  const hoursOfDay = createNumbersArray(0, 24)
    .map(
      (timeSlot) =>
        `<div class="calendar__time-slot"
        data-time="${timeSlot}">   
          </div>`
    )
    .join("");
  return hoursOfDay;
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
};
export const renderWeek = () => {
  const startDate = getItem("displayedWeekStart");
  const daysList = generateWeekRange(startDate);
  const dayTemplateString = generateDay();
  const weekElementString = daysList
    .map(
      (day) =>
        `<div class="calendar__day" data-day="${day.getDate()}">${dayTemplateString}</div>`
    )
    .join("");
  document.querySelector(".calendar__week").innerHTML = weekElementString;
  renderEvents();

  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
