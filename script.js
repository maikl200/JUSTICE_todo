const input = document.getElementById('addInput')
const todoList = document.getElementById('todoList')
let storage = []

if (localStorage.getItem('TODO')) {
  storage = JSON.parse(localStorage.getItem('TODO'))
  displayTodo()
}

// Если задач нет - на страницу выводится сообщение
const noneTask = () => {
  if (!storage.length) {
    todoList.innerHTML = `<h1 class="noneTask">Задач нет</h1>`
  }
}
noneTask()

// Добавления задачи
function btnAdd() {
  storage.push(input.value)
  input.value = ''
  localStorage.setItem('TODO', JSON.stringify(storage))
  displayTodo()
}

function displayTodo() {
  todoList.innerHTML = ``
  storage.map((e, i) => {
    const itemCard = document.createElement('div')
    itemCard.classList.add('todo-item')
    itemCard.innerHTML = `
               <input readonly type="text" value="${e}">
               <div class="todo-item__icons">
               <img id="deleteImg" class="todo-item__icon-delete"
               src="./assets/icons/trash-icon.svg"
               alt="trash-icon">
               <img id="redactImg" class="todo-item__icon-edit"
               src="./assets/icons/edit-icon.svg"
               alt="edit-icon">
               <img class="todo-item__icon-mobile"
               src="./assets/icons/mobile-ellipse.svg"
               alt="mobile-ellipse">
               </div> `

    itemCard.addEventListener('click', event => {
      event.target.classList.contains('todo-item__icon-delete') && deleteTask(i)
      event.target.classList.contains('todo-item__icon-edit') && editTask(event.currentTarget, i)
      noneTask()
    })

    // Если нет задач - выводится сообщение на страницу
    todoList.append(itemCard)
  })
}

// Если поле пустое - при нажатии на кнопку ничего выводится не будет
const btn = document.querySelector('.add-field__btn')
btn.addEventListener('click', e => {
  input.value && btnAdd();
})

// Редактирование задачи
const editTask = (item, index) => {
  const editCard = item.querySelector('input')
  editCard.removeAttribute('readonly')
  editCard.focus()
  editCard.selectionStart = editCard.value.length
  editCard.addEventListener('change', e => {
    storage[index] = editCard.value
    editCard.setAttribute('readonly', '')
    localStorage.setItem("TODO", JSON.stringify(storage))

    // Если пользователь оставит поле пустым - то задача удалится
    if (!editCard.value.length) {
      storage.splice(index, 1)
      localStorage.setItem('TODO', JSON.stringify(storage))
    }
    displayTodo()
  })
}

// Удаление задачи
const deleteTask = i => {
  storage.splice(i, 1)
  localStorage.setItem('TODO', JSON.stringify(storage))
  displayTodo()
}

