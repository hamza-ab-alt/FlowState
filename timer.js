const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;



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
