import { removeTodo, toggleFinishTodo, editTodo } from '../../redux/actioncreators.js'
import TodoList from './TodoList'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    todos: state.index.todos,
    removeLoading: state.index.removeLoading,
    finishLoading: state.index.finishLoading,   
    editLoading: state.index.editLoading
})

const mapDispatchToProps = dispatch => ({
    removeTodo: id => {
        dispatch(removeTodo(id))
    },
    toggleFinishTodo: id => {
        dispatch(toggleFinishTodo(id))
    },
    editTodo: (id, newText) => {
        dispatch(editTodo(id, newText))
    },
})

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default TodoListContainer