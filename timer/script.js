const timersContainer = document.getElementById("timers-container");
const addTimerBtn = document.getElementById("add-timer-btn");

let timerCount = 0;
const intervals = {};

function createTimer() {
  const timerId = `timer-${++timerCount}`;

  const timerHTML = `
    <div class="timer-box" id="${timerId}">
      <input type="datetime-local" class="datetime-picker" />
      <button class="start-btn">Start</button>
      <div class="countdown">
        <div><span class="days">00</span><p>Days</p></div>
        <div><span class="hours">00</span><p>Hours</p></div>
        <div><span class="minutes">00</span><p>Minutes</p></div>
        <div><span class="seconds">00</span><p>Seconds</p></div>
      </div>
      <p class="message"></p>
      <button class="remove-btn">Remove</button>
    </div>
  `;

  timersContainer.insertAdjacentHTML("beforeend", timerHTML);

  const timerEl = document.getElementById(timerId);
  const startBtn = timerEl.querySelector(".start-btn");
  const datetimePicker = timerEl.querySelector(".datetime-picker");
  const removeBtn = timerEl.querySelector(".remove-btn");

  startBtn.addEventListener("click", () => {
    const targetDate = new Date(datetimePicker.value).getTime();
    if (isNaN(targetDate)) {
      alert("Please select a valid date and time.");
      return;
    }

    clearInterval(intervals[timerId]);

    intervals[timerId] = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      const days = timerEl.querySelector(".days");
      const hours = timerEl.querySelector(".hours");
      const minutes = timerEl.querySelector(".minutes");
      const seconds = timerEl.querySelector(".seconds");
      const message = timerEl.querySelector(".message");

      if (diff <= 0) {
        clearInterval(intervals[timerId]);
        days.textContent = hours.textContent = minutes.textContent = seconds.textContent = "00";
        message.textContent = "Time's up!";
        return;
      }

      days.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      hours.textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      minutes.textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      seconds.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      message.textContent = "";
    }, 1000);
  });

  // 🗑️ Remove timer
  removeBtn.addEventListener("click", () => {
    clearInterval(intervals[timerId]);
    delete intervals[timerId];
    timerEl.remove();
  });
}

// Initialize with one timer
createTimer();

// Add more timers
addTimerBtn.addEventListener("click", createTimer);
