var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `selector ${selector} not exist`
        alert(s)
    } else {
        return element
    }
}

// todo 使用list-group并不好，要换成别的

const bindEdit = (self) => {
    const todoContent = self.closest('.todo-edit')
    todoContent.contentEditable = true
    todoContent.focus()
}

const bindUpdate = (self) => {
    if (event.key == 'Enter') {
        event.preventDefault()
        self.contentEditable = false
    }
}
const bindDone = (self) => {
    const todoItem = self.closest('.list-group-item')
    const todoContent = todoItem.querySelector('.todo-edit')
    todoContent.classList.toggle('active')
}

const templateTodo = (todo) => {
    const t = `
        <div class="list-group">
            <div class="list-group-item">
                <label class="btn active">
                    <input class="done" type="checkbox" unchecked autocomplete="off">
                </label>
                <span class="todo-edit">${todo}</span>
                <button class="remove btn btn-outline-secondary btn-sm">Cancel</button>
            </div>
        </div>
        `
    return t
}

const bindAdd = (todoContainer) => {
    var todo = e('.todo-input').value
    if (todo.length !== 0) {
        var todo = templateTodo(todo)
        todoContainer.insertAdjacentHTML("beforeend", todo)
    }
}

const bindDelete = (self) => {
    const button = self.closest('.list-group')
    button.remove()
}

const bindEventDelegates = () => {
    const todoContainer = e('.todo-container')
    todoContainer.addEventListener('click', function () {
        const self = event.target
        if (self.classList.contains('remove')){
            bindDelete(self)
        } else if (self.classList.contains('add')){
            bindAdd(todoContainer)
        } else if (self.classList.contains('done')) {
            bindDone(self)
        } else if (self.classList.contains('todo-edit')) {
            bindEdit(self)
        }
    })
    todoContainer.addEventListener('keydown', function () {
        const self = event.target
        if (self.classList.contains('todo-edit')) {
            bindUpdate(self)
        }
    })
}

const __main = () => {
    bindEventDelegates()
}

__main()
