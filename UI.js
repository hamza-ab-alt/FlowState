export const renderTodo = (container, tasks, add, remove, toggle) => {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "space-y-3 flex flex-col";

  const addRow = document.createElement("div");
  addRow.className = "flex items-center gap-2";

