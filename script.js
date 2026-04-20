// Select DOM Elements
let input = document.getElementById("todo-input");
let addBtn = document.getElementById("add-btn");
let list = document.getElementById("todo-list");

// try to load saved todos from localstorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  // save current todos array to localstorage
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  // checkbox to toggle completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    // TODO: Visual feedback: strike-through when completed
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // Text of the todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }
  // ADD DOUBLE-CLICK EVENTLISTENER TO EDIT TODO
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });
  // Delete Todo button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}
// Render the whole todo list from todos array
function render() {
  list.innerHTML = "";

  // Recreate each item
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }
  // push a new todo object
  todos.push({ text: text, completed: false });
  input.value = "";
  render();
  saveTodos();
}
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
render();
