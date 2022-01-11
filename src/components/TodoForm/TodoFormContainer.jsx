import { addTodo, removeFinished } from '../../redux/actioncreators.js'
import TodoForm from './TodoForm'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    isAddedLoading: state.index.isAddedLoading,
    removeFinishedLoading: state.index.removeFinishedLoading,
    todos: state.index.todos
})

const mapDispatchToProps = dispatch => ({
    addTodo: todoText => {
        dispatch(addTodo(todoText))
    },
    removeFinished: () => {
        dispatch(removeFinished())
    },
})

const TodoFormContainer = connect(mapStateToProps, mapDispatchToProps)(TodoForm)
export default TodoFormContainer