import { initTodo } from "./todo.js";
import { initTimer } from "./timer.js";
import { getTasks } from "./storage.js";

const start = () => {
  const todoContainer = document.getElementById("todo-app");
  const timerDisplay = document.getElementById("timer");
  const timerButtons = document.getElementById("timer-buttons");

  initTodo(todoContainer);
  initTimer(timerDisplay, timerButtons, document.getElementById("timer-state"), getTasks);
};

start();
