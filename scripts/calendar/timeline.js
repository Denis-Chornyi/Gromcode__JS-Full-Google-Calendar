export const highlightDate = () => {
  const getCurTimeEl = document.querySelector('.current-time');
  const getTimeSlotsArr = [...document.querySelectorAll('.calendar__time-slot')];
  // const getDaysArr = [...document.querySelectorAll('.calendar__day')];
  console.log(getCurTimeEl);
  return getTimeSlotsArr.map(slot => {
    getCurTimeEl.dataset.time = new Date().getHours();
    getCurTimeEl.dataset.day = new Date().getDay();

    if (getCurTimeEl.dataset.time === slot.dataset.time) {
      getCurTimeEl.style.left = '-5px';
      getCurTimeEl.style.top = `${new Date().getMinutes()}px`;
      slot.append(getCurTimeEl);
    }
  });
};
