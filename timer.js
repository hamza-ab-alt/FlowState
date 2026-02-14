const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const format = s =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60)
    .toString()
    .padStart(2, "0")}`;

export const initTimer = (displayEl, buttonsEl, stateEl, getTasks) => {
  let time = FOCUS_DURATION;
  let isBreak = false;
  let interval = null;
  let errorShown = false;

  const updateState = () => {
    if (stateEl) {
      stateEl.textContent = errorShown ? "ERREUR" : isBreak ? "PAUSE" : "FOCUS";
      stateEl.className = errorShown
        ? "text-red-600 font-semibold tracking-widest"
        : isBreak
          ? "text-green-600 font-semibold tracking-widest"
          : "text-red-600 font-semibold tracking-widest";
    }
  };

  const render = () => {
    updateState();
    displayEl.innerHTML = `<div class="text-6xl font-bold">${format(time)}</div>`;
    displayEl.dataset.state = errorShown ? "error" : "";

    buttonsEl.innerHTML = `
      <div class="flex gap-4 justify-center flex-wrap">
        <button id="timer-start" class="bg-[#8B7355] text-white px-8 py-4 rounded-xl flex flex-col items-center gap-1 hover:bg-[#7a6347] transition">
          <span class="text-2xl">▶</span>
          <span class="text-sm font-medium">START</span>
        </button>
        <button id="timer-reset" class="bg-[#f3e5c8] text-[#5c4a32] border-2 border-[#8B7355] px-8 py-4 rounded-xl flex flex-col items-center gap-1 hover:bg-[#e8d9b8] transition">
          <span class="text-2xl">↺</span>
          <span class="text-sm font-medium">RETURN</span>
        </button>
      </div>
    `;

    if (errorShown) {
      const err = document.createElement("p");
      err.className = "text-red-600 font-semibold mt-2 text-center text-sm";
      err.textContent = "Erreur : configurez au moins une tâche avant de lancer le Pomodoro.";
      buttonsEl.prepend(err);
    }

    document.getElementById("timer-start")?.addEventListener("click", start);
    document.getElementById("timer-reset")?.addEventListener("click", reset);
  };

  const tick = () => {
    time--;
    render();

    if (time <= 0) {
      clearInterval(interval);
      interval = null;
      isBreak = !isBreak;
      time = isBreak ? BREAK_DURATION : FOCUS_DURATION;
      alert(isBreak ? "Pause 5 minutes !" : "Retour au focus 25 minutes !");
      render();
    }
  };

  const start = () => {
    const tasks = getTasks();
    if (tasks.length === 0) {
      errorShown = true;
      render();
      return;
    }

    errorShown = false;
    if (!interval) {
      interval = setInterval(tick, 1000);
    }
  };

  const reset = () => {
    clearInterval(interval);
    interval = null;
    errorShown = false;
    isBreak = false;
    time = FOCUS_DURATION;
    render();
  };

  render();
};
