const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = 0;
let uncheckedCount = 0;

function retrieveData() {
  if (localStorage.getItem('todos')) {
    let todos = JSON.parse(localStorage.getItem('todos'))
    todos.map(todo => newTodo(todo));
  }
}

retrieveData();

function newTodo(new_todo = false) {
  if (!new_todo) {
    let todo = prompt("Enter a new todo: ");

    new_todo = {
      "todo": todo,
      "checked": false
    };

    saveItem(new_todo);
  }
  // Create list element
  let list_elem = document.createElement("li");
  list_elem.className = classNames.TODO_TEXT;

  // Create and append input
  let input = document.createElement("input");
  input.type = "checkbox"
  input.setAttribute("onclick", "check(event)");
  if (new_todo.checked) input.setAttribute("checked", "true");
  list_elem.appendChild(input);

  // Create and append label
  let label = document.createElement("label");
  label.innerHTML = new_todo.todo;
  list_elem.appendChild(label);

  // Create and append button
  let button = document.createElement("button");
  button.innerHTML = "x";
  button.setAttribute("class", "delete");
  button.setAttribute("onclick", "removeItem(event)");
  list_elem.appendChild(button);

  // Append new li to the ul
  list.appendChild(list_elem);

  itemCount += 1;
  if (!new_todo.checked) uncheckedCount += 1;
  itemCountSpan.innerHTML = itemCount;
  uncheckedCountSpan.innerHTML = uncheckedCount;
}

function check(event) {
  todoText = event.path[1].childNodes[1].innerHTML;
  updateItem(todoText);

  if (event.target.checked) {
    uncheckedCount -= 1;
  } else {
    uncheckedCount += 1;
  }
  uncheckedCountSpan.innerHTML = uncheckedCount;
}

function removeItem(event) {
  todoText = event.path[1].childNodes[1].innerHTML;
  event.path[1].remove();

  let todos = JSON.parse(localStorage.getItem('todos'));
  for (let i in todos) {

    if (todos[i].todo === todoText) {
      if (!todos[i].checked) uncheckedCount -= 1;

      todos.splice(i, 1)
      localStorage.setItem('todos', JSON.stringify(todos));
      break;
    }
  }

  itemCount -= 1;
  itemCountSpan.innerHTML = itemCount;
  uncheckedCountSpan.innerHTML = uncheckedCount;
}

function saveItem(new_todo) {
  if (!localStorage.getItem('todos')) {

    localStorage.setItem('todos', JSON.stringify([new_todo]));

  } else {

    let todos = JSON.parse(localStorage.getItem('todos'))
    todos.push(new_todo);
    localStorage.setItem('todos', JSON.stringify(todos));

  }
}

function updateItem(todoText) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  for (let x of todos) {

    if (x.todo === todoText) {
      x.checked ? x.checked = false : x.checked = true;
      break;
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}