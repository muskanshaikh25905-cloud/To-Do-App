const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
//bacchi
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.onclick = () => toggleTodo(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  input.value = "";

  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

// Optional: add task by pressing Enter
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Initial render
renderTodos();

