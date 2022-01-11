window.delay = 500 // ms
// it is declared through `window` so that you can change it in console

function getUserTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]')
}

function setUserTodos(newTodos) {
    localStorage.setItem('todos', JSON.stringify(newTodos))
}

function withDelay(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(callback())
        }, window.delay)
    })
}

const DataSource = {
    addTodo: (todoText, todoId) => withDelay(() => {
        if (!getUserTodos()) setUserTodos([])
        setUserTodos([...getUserTodos(), {
            text: todoText,
            finished: false,
            id: todoId
        }])
    }),

    removeTodo: (todoId) => withDelay(() => {
        setUserTodos(
            getUserTodos().filter((todo) => todo.id !== todoId)
        )
    }),

    removeFinished: () => withDelay(() => {
        setUserTodos(
            getUserTodos().filter(todo => !todo.finished)
        )
    }),

    removeAllTodos: () => withDelay(() => {
        setUserTodos([])
    }),

    toggleFinishTodo: todoId => withDelay(() => {
        setUserTodos(
            getUserTodos().map(todo => ({
                ...todo,
                finished: (todo.id === todoId ? !todo.finished : todo.finished)
            }))
        )
    }),

    editTodo: (todoId, newText) => withDelay(() => {
        setUserTodos(
            getUserTodos().map(todo => ({
                ...todo,
                text: (todo.id === todoId ? newText : todo.text)
            }))
        )
    }),
    
    // For debugging purposes
    getTodos: () => withDelay(() => {
        return getUserTodos() || []
    })
}

// window.DataSource = DataSource
export default DataSource