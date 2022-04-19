const input = document.getElementById('addInput')
let todoList = document.getElementById('todoList')
let storage = []

if (localStorage.getItem('TODO')) {
  storage = JSON.parse(localStorage.getItem('TODO'))
  displayTodo()
}

// Добавления задачи
function btnAdd() {
  storage.push(input.value)
  localStorage.setItem('TODO', JSON.stringify(storage))
  displayTodo()
}


function displayTodo() {
  let todoAdd = ''
  storage.reverse().map((e) => {
    todoAdd += `
               <div id="todoItem" class="todo-item">
               <span>${e}</span>\n  
               <div class="todo-item__icons">
               <img id="deleteImg" class="todo-item__icon"
               src="./assets/icons/trash-icon.svg"\n
               alt="trash-icon">\n
               <img id="redactImg" class="todo-item__icon"\n
               src="./assets/icons/edit-icon.svg"\n
               alt="edit-icon">\n
               <img class="todo-item__icon-mobile"\n
               src="./assets/icons/mobile-ellipse.svg"\n
               alt="mobile-ellipse">\n
               </div>
               </div>`

    todoList.innerHTML = todoAdd
    input.value = ''

    const deleteBtn = document.querySelector('#deleteImg')
    const todoItem = document.querySelector('#todoItem')
    console.log(todoItem)

    deleteBtn.addEventListener('click', e => {

    })

  })
}


// Если поле пустое - при нажатии на кнопку ничего выводится не будет
const btn = document.querySelector('.add-field__btn')
btn.addEventListener('click', e => {
  input.value && btnAdd();
})

// Удаление задачи












