export const renderTodo = (container, tasks, add, remove, toggle) => {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "space-y-3 flex flex-col";

  const addRow = document.createElement("div");
  addRow.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.placeholder = "Nouvelle tâche...";
  input.className = "flex-1 border-2 border-[#8B7355]/40 bg-white/80 p-2 rounded-xl text-[#5c4a32] placeholder:text-[#8B7355]/60";
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      add(input.value.trim());
      input.value = "";
    }
  });

  const btn = document.createElement("button");
  btn.innerHTML = "<span class='text-2xl text-white leading-none'>+</span>";
  btn.className = "w-12 h-12 rounded-full bg-[#8B7355] flex items-center justify-center hover:bg-[#7a6347] transition shrink-0";
  btn.title = "Ajouter une tâche";
  btn.onclick = () => {
    add(input.value.trim());
    input.value = "";
  };

  addRow.append(input, btn);
  wrapper.append(addRow);

  if (!tasks.length) {
    const empty = document.createElement("p");
    empty.className = "text-[#8B7355]/70 italic py-4 text-center";
    empty.textContent = " Aucune tâche… commence petit, gagne grand.";
    wrapper.append(empty);
  }

  tasks.forEach(t => {
    const row = document.createElement("div");
    row.className = "flex items-center gap-3 bg-[#e8d9b8]/80 p-3 rounded-xl border border-[#8B7355]/20";

    const radio = document.createElement("button");
    radio.className = `w-5 h-5 rounded-full border-2 border-[#8B7355] flex items-center justify-center shrink-0 ${t.done ? "bg-[#8B7355]" : ""}`;
    radio.innerHTML = t.done ? "<span class='text-white text-xs'>✓</span>" : "";
    radio.onclick = () => toggle(t.id);

    const span = document.createElement("span");
    span.textContent = t.title;
    span.className = `flex-1 cursor-pointer ${t.done ? "line-through text-[#8B7355]/70" : "text-[#5c4a32]"}`;
    span.onclick = () => toggle(t.id);

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "text-[#8B7355] hover:text-red-600 transition";
    del.onclick = e => {
      e.stopPropagation();
      remove(t.id);
    };

    row.append(radio, span, del);
    wrapper.append(row);
  });

  container.append(wrapper);
};
