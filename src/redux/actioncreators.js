import DataSource from '../datasource.js'
import shortid from 'shortid'
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
} from './types.js'

export const ac = {
    addTodoStart: todoText => ({
        type: ADD_TODO_START,
        todoText: todoText
    }),
    addTodoSuccess: (todoText, todoId) => ({
        type: ADD_TODO_SUCCESS,
        todoText: todoText,
        todoId: todoId 
    }),
    addTodoFailure: err => ({
        type: ADD_TODO_FAILURE,
        error: err
    }),
    removeTodoStart: id => ({
        type: REMOVE_TODO_START,
        id: id
    }),
    removeTodoSuccess: id => ({
        type: REMOVE_TODO_SUCCESS,
        id: id
    }),
    removeTodoFailure: (id, err) => ({
        type: REMOVE_TODO_FAILURE,
        id: id,
        error: err
    }),
    toggleFinishTodoStart: (id) => ({
        type: TOGGLE_FINISH_TODO_START,
        id: id
    }),
    toggleFinishTodoSuccess: (id) => ({
        type: TOGGLE_FINISH_TODO_SUCCESS,
        id: id
    }),
    toggleFinishTodoFailure: (id, err) => ({
        type: TOGGLE_FINISH_TODO_FAILURE,
        id: id,
        err: err
    }),
    editTodoStart: (id) => ({
        type: EDIT_TODO_START,
        id: id
    }),
    editTodoSuccess: (id, newText) => ({
        type: EDIT_TODO_SUCCESS,
        id: id,
        newText: newText
    }),
    editTodoFailure: (id, err) => ({
        type: EDIT_TODO_FAILURE,
        id: id,
        err: err
    }),
    removeAllStart: () => ({
        type: REMOVE_ALL_START
    }),
    removeAllSuccess: () => ({
        type: REMOVE_ALL_SUCCESS
    }),
    removeAllFailure: err => ({
        type: REMOVE_ALL_FAILURE,
        err: err
    }),
    removeFinishedStart: () => ({
        type: REMOVE_FINISHED_START  
    }),
    removeFinishedSuccess: () => ({
        type: REMOVE_FINISHED_SUCCESS
    }),
    removeFinishedFailure: (err) => ({
        type: REMOVE_FINISHED_FAILURE,
        err: err
    })
}

export const addTodo = todoText => dispatch => {
    const todoId = shortid.generate()

    dispatch(ac.addTodoStart(todoText))
    DataSource.addTodo(todoText, todoId)
        .then(() => {
            dispatch(ac.addTodoSuccess(todoText, todoId))
        })
        .catch(err => {
            console.error(err)
            dispatch(ac.addTodoFailure(err))
        })
}

export const removeTodo = id => dispatch => {
    dispatch(ac.removeTodoStart(id))

    DataSource.removeTodo(id)
        .then(() => {
            dispatch(ac.removeTodoSuccess(id))
        })
        .catch(err => {
            console.error(err)
            dispatch(ac.removeTodoFailure(id, err))
        })
}

export const removeFinished = () => dispatch => {
    dispatch(ac.removeFinishedStart())

    DataSource.removeFinished()
        .then(() => {
            dispatch(ac.removeFinishedSuccess())
        })
        .catch(err => {
            console.error(err)
            dispatch(ac.removeFinishedFailure(err))
        })
}

export const removeAll = () => dispatch => {
    dispatch(ac.removeAllStart())

    DataSource.removeAllTodos()
        .then(() => {
            dispatch(ac.removeAllSuccess())
        })
        .catch(err => {
            dispatch(ac.removeAllFailure(err))
        })
}

export const toggleFinishTodo = id => dispatch => {
    dispatch(ac.toggleFinishTodoStart(id))

    DataSource.toggleFinishTodo(id)
        .then(() => {
            dispatch(ac.toggleFinishTodoSuccess(id))
        })
        .catch(err => {
            console.error(err)
            dispatch(ac.toggleFinishTodoFailure(id, err))
        })
}

export const editTodo = (id, newText) => dispatch => {
    dispatch(ac.editTodoStart(id))

    DataSource.editTodo(id, newText)
        .then(() => {
            dispatch(ac.editTodoSuccess(id, newText))
        })
        .catch(err => {
            console.error(err)
            dispatch(ac.editTodoFailure(id, err))
        })
}