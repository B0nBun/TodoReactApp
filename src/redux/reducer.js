import {
    ADD_TODO_START,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    REMOVE_TODO_START,
    REMOVE_TODO_SUCCESS,
    REMOVE_TODO_FAILURE,
    TOGGLE_FINISH_TODO_START,
    TOGGLE_FINISH_TODO_SUCCESS,
    TOGGLE_FINISH_TODO_FAILURE,
    EDIT_TODO_START,
    EDIT_TODO_SUCCESS,
    EDIT_TODO_FAILURE,
    REMOVE_ALL_START,  
    REMOVE_ALL_SUCCESS,
    REMOVE_ALL_FAILURE,  
    REMOVE_FINISHED_START,
    REMOVE_FINISHED_SUCCESS,
    REMOVE_FINISHED_FAILURE,
    UNDO_ACTION
} from './types.js'

const initState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    isAddedLoading: false,
    removeLoading: [],
    removeAllLoading: false,
    removeFinishedLoading: false,
    finishLoading: [],
    editLoading: [],

    prevStates: []
}

const reducer = (state = initState, action) => {
    let copyState = {}

    switch (action.type) {
        case ADD_TODO_SUCCESS:
        case REMOVE_TODO_SUCCESS:
        case TOGGLE_FINISH_TODO_SUCCESS:
        case EDIT_TODO_SUCCESS:
        case REMOVE_ALL_SUCCESS:
        case REMOVE_FINISHED_SUCCESS:
            // Вроде как сохраняет все что нужно, но надо протестировать
            state.prevStates = [...state.prevStates, state.todos]
            break
        default:
            break
    }

    switch (action.type) {
        case ADD_TODO_START:
            copyState = {
                ...state,
                isAddedLoading: true
            }
            return copyState
        case ADD_TODO_SUCCESS:
            copyState = {
                ...state,
                todos: [...state.todos, {
                    text: action.todoText,
                    finished: false,
                    id : action.todoId
                }],
                isAddedLoading: false
            }
            return copyState
        case ADD_TODO_FAILURE:
            copyState = {
                ...state,
                isAddedLoading: false
            }
            return copyState
        case REMOVE_TODO_START:
            copyState = {
                ...state,
                removeLoading: [...state.removeLoading, action.id]
            }
            return copyState
        case REMOVE_TODO_SUCCESS:
            copyState = {
                ...state,
                todos: [...state.todos.filter(todo => todo.id !== action.id)],
                removeLoading: [...state.removeLoading.filter(id => id !== action.id)]
            }
            return copyState
        case REMOVE_TODO_FAILURE:
            copyState = {
                ...state,
                removeLoading: [...state.removeLoading.filter(id => id !== action.id)]
            }
            return copyState
        case REMOVE_FINISHED_START:
            copyState = {
                ...state,
                removeFinishedLoading: true
            }
            return copyState
        case REMOVE_FINISHED_SUCCESS:
            copyState = {
                ...state,
                todos: [...state.todos.filter(todo => !todo.finished)],
                removeFinishedLoading: false
            }
            return copyState
        case REMOVE_FINISHED_FAILURE:
            copyState = {
                ...state,
                removeFinishedLoading: false
            }
            return copyState
        case REMOVE_ALL_START:
            copyState = {
                ...state,
                removeAllLoading: true
            }
            return copyState
        case REMOVE_ALL_SUCCESS:
            copyState = {
                ...state,
                todos: [],
                removeAllLoading: false
            }
            return copyState
        case REMOVE_ALL_FAILURE:
            copyState = {
                ...state,
                removeAllLoading: false
            }
            return copyState
        case TOGGLE_FINISH_TODO_START:
            copyState = {
                ...state,
                finishLoading: [...state.finishLoading, action.id]
            }
            return copyState
        case TOGGLE_FINISH_TODO_SUCCESS:
            copyState = {
                ...state,
                todos: [...state.todos.map(todo => {
                        if (todo.id === action.id) {
                            todo.finished = !todo.finished
                        }
                        return todo
                    })
                ],
                finishLoading: [...state.finishLoading.filter(id => id !== action.id)]
            }
            return copyState
        case TOGGLE_FINISH_TODO_FAILURE:
            copyState = {
                ...state,
                finishLoading: [...state.finishLoading.filter(id => id !== action.id)]
            }
            return copyState
        case EDIT_TODO_START:
            copyState = {
                ...state,
                editLoading: [...state.editLoading, action.id]
            }
            return copyState
        case EDIT_TODO_SUCCESS:
            copyState = {
                ...state,
                todos: [...state.todos.map(todo => {
                    if (todo.id === action.id) {
                        todo.text = action.newText
                    }
                    return todo
                })],
                editLoading: [...state.editLoading.filter(id => id !== action.id)]
            }
            return copyState
        case EDIT_TODO_FAILURE:
            copyState = {
                ...state,
                editLoading: [...state.editLoading.filter(id => id !== action.id)]
            }
            return copyState
        case UNDO_ACTION:
            copyState = {
                ...state,
                todos: state.prevStates.length === 0 ? state.todos : state.prevStates.pop()
            }
            return copyState
        default:
            return state
    }
}

export default reducer