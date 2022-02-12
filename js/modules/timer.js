import { getZero } from "../services/services";

function timer(selector, textSelect, endTime) {
  // Timer

  const getTimingRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24) - 3,
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const setClock = (selector, textSelect, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000),
      texts = document.querySelector(textSelect),
      text = texts.querySelector("#text");

    updateClock();

    const t = getTimingRemaining(endTime);
    text.innerHTML = `Акция закончи${t.t < 0 ? "лась" : "тся"} <span>
    ${new Date(endTime).getDate()} 
    ${months[new Date(endTime).getMonth()]}</span> в 00:00`;

    function updateClock() {
      let t = getTimingRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.t <= 0) clearInterval(timeInterval);
    }
  };

  setClock(selector, textSelect, endTime);
}

export default timer;
