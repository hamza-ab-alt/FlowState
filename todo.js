import { getTasks, saveTasks } from "./storage.js";
import { renderTodo } from "./UI.js";

const regex = /^[a-zA-Z0-9\s]+$/;

export const initTodo = container => {
  let tasks = getTasks();

  const update = () => {
    saveTasks(tasks);
    renderTodo(container, tasks, add, remove, toggle);
  };

  const add = title => {
    const t = String(title ?? "").trim();
    if (!t) return;
    if (!regex.test(t)) return alert("Titre invalide : lettres, chiffres et espaces uniquement.");
    tasks.push({ id: Date.now(), title: t, done: false });
    update();
  };

