const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const errorEl = document.getElementById("task-error");
const list = document.getElementById("task-list");
const emptyEl = document.getElementById("empty");
const countEl = document.getElementById("count");
const clearBtn = document.getElementById("clear-done");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = load();
let filter = "all";

function load() {
  try { return JSON.parse(localStorage.getItem("fsd-todo")) || []; }
  catch (e) { return []; }
}
function save() {
  try { localStorage.setItem("fsd-todo", JSON.stringify(tasks)); } catch (e) { /* storage unavailable */ }
}

// ----- create one <li> using DOM methods -----
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.done ? " done" : "");
  li.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", "Mark \"" + task.text + "\" as completed");
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const text = document.createElement("span");
  text.className = "text";
  text.textContent = task.text;           // textContent keeps user input safe

  const del = document.createElement("button");
  del.className = "del";
  del.textContent = "Delete";
  del.addEventListener("click", () => deleteTask(task.id, li));

  li.append(checkbox, text, del);
  return li;
}

function render() {
  list.replaceChildren();
  const visible = tasks.filter(t =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done);
  visible.forEach(t => list.appendChild(createTaskElement(t)));

  emptyEl.hidden = visible.length > 0;
  emptyEl.textContent = tasks.length === 0
    ? "No tasks yet. Add your first one above."
    : "Nothing in this view.";

  const left = tasks.filter(t => !t.done).length;
  countEl.textContent = left + (left === 1 ? " task left" : " tasks left");
  clearBtn.disabled = !tasks.some(t => t.done);
}

// ----- actions -----
function addTask(text) {
  tasks.push({ id: Date.now() + Math.random(), text, done: false });
  save(); render();
}
function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.done = !t.done;
  save(); render();
}
function deleteTask(id, li) {
  tasks = tasks.filter(t => t.id !== id);
  li.remove();                            // remove the node from the DOM
  save(); render();
}

// ----- events -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    errorEl.textContent = "Type a task before adding it.";
    input.classList.add("invalid");
    return;
  }
  errorEl.textContent = "";
  input.classList.remove("invalid");
  addTask(text);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  errorEl.textContent = "";
  input.classList.remove("invalid");
});

filterButtons.forEach(btn => btn.addEventListener("click", () => {
  filter = btn.dataset.filter;
  filterButtons.forEach(b => b.classList.toggle("active", b === btn));
  render();
}));

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.done);
  save(); render();
});

render();
