var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return element
    }
}

// todo 开局缓存
// todo 整理一下重构思路
// todo 添加ajax数据交换
// todo 使用list-group并不好，要换成别的

var actionEdit = () => {
    var self = event.target
    if (self.classList.contains('todo-edit')) {
        var todoContent = self.closest('.todo-edit')
        todoContent.contentEditable = true
        todoContent.focus()
    }
}
var actionUpdate = () => {
    var self = event.target
    if (self.classList.contains('todo-edit')) {
        if (event.key == 'Enter') {
            event.preventDefault()
            self.contentEditable = false
        }
    }
}
var actionDone = () => {
    var self = event.target
    if (self.classList.contains('done')) {
        var todoItem = self.closest('.list-group-item')
        var todoContent = todoItem.querySelector('.todo-edit')
        todoContent.classList.toggle('active')
    }
}
var templateTodo = (todo) => {
    var t = `
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

var actionAdd = (todoContainer) => {
    var self = event.target
    var todo = e('.todo-input').value
    var todo = templateTodo(todo)
    if (self.classList.contains('add')){
        if (todo.length !== 0) {
            todoContainer.insertAdjacentHTML("beforeend", todo)
        }
    }
}

var actionDelete = () => {
    var self = event.target
    if (self.classList.contains('remove')){
        var button = self.closest('.list-group')
        button.remove()
    }
}

var bindAction = () => {
    var todoContainer = e('.todo-container')
    todoContainer.addEventListener('click', function () {
        actionAdd(todoContainer)
        actionDelete()
        actionDone()
        actionEdit()
    })
    todoContainer.addEventListener('keydown', function () {
        actionUpdate()
    })
}

var __main = () => {
    bindAction()
}

__main()
