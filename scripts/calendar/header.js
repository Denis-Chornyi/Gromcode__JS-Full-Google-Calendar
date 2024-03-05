import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const calendarHeader = document.querySelector(".calendar__header");
export const renderHeader = () => {
  const headerWeek = generateWeekRange(getItem("displayedWeekStart"))
    .map(
      (DayOfWeekNumber) =>
        `<div class="calendar__day-label day-label">
    <span class="day-label__day-name">${
      daysOfWeek[DayOfWeekNumber.getDay()]
    }</span>
    <span class="day-label__day-number">${DayOfWeekNumber.getDate()}</span>
    </div>`
    )
    .join("");

  calendarHeader.innerHTML = headerWeek;
  return headerWeek;
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};
// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
