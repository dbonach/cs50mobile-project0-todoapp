const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = 1;
let uncheckedCount = 1;

function newTodo() {
  let new_todo = prompt("Enter a new todo: ");
  let new_item = document.createElement("li");
  new_item.className = classNames.TODO_TEXT;

  let input = document.createElement("input");
  input.type = "checkbox"
  input.setAttribute("onclick", "check(event.target)");
  new_item.appendChild(input);

  let label = document.createElement("label");
  label.innerHTML = new_todo;
  new_item.appendChild(label);

  let button = document.createElement("button");
  button.innerHTML = "x";
  button.setAttribute("class", "delete");
  button.setAttribute("onclick", "removeItem(event)");
  new_item.appendChild(button);

  list.appendChild(new_item);

  itemCount += 1;
  uncheckedCount += 1;
  itemCountSpan.innerHTML = itemCount;
  uncheckedCountSpan.innerHTML = uncheckedCount;
}

function check(target) {
  if (target.checked) {
    uncheckedCount -= 1;
  } else {
    uncheckedCount += 1;
  }
  uncheckedCountSpan.innerHTML = uncheckedCount;
}

function removeItem(target) {
  target.path[1].remove();
  itemCount -= 1;
  uncheckedCount -= 1;
  itemCountSpan.innerHTML = itemCount;
  uncheckedCountSpan.innerHTML = uncheckedCount;
}
