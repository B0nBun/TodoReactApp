/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react'
import styles from '../styles'
import { FaTrash as DeleteIcon } from 'react-icons/fa'
// import { ImCross as DeleteIcon } from 'react-icons/im'
import { motion, useAnimation } from 'framer-motion' 
import { handleQuotesKeypress } from '../Utils'
import { ImCheckboxChecked as CheckedBox, ImCheckboxUnchecked as UncheckedBox } from 'react-icons/im'

function TodoItem({todo, removeLoading, finishLoading, editLoading, removeTodo, toggleFinishTodo, editTodo}) {

    const textareaRef = useRef(null)

    const controls = useAnimation()
    const taskVariants = {
        hidden: {
            opacity: 0
        },
        muted: {
            opacity: .5,
        },
        visible: {
            opacity: 1
        }
    }
    
    useEffect(() => {
        handleTextareaResize()
        window.addEventListener('resize', handleTextareaResize)
        controls.start(todo.finished ? 'muted' : 'visible')

        return () => {
            window.removeEventListener('resize', handleTextareaResize)
        }
    }, [controls, todo.finished])
    
    function handleRemove(e) {
        e.preventDefault()
        e.currentTarget.blur()
        controls.start('hidden').then(() => {
            removeTodo(todo.id)
        })
    }

    function handleFinish(e) {
        e.preventDefault()
        toggleFinishTodo(todo.id)
        controls.start(todo.finished ? 'visible' : 'muted')
        e.currentTarget.blur()
    }

    function handleCtrlEnter(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault()
            e.currentTarget.blur()
        }
    }


    function handleTextareaResize() {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";
        // This here is an awful crutch, but I don't know how to fix the problem with extra space below textarea
        const fontSize = Math.round(Number(getComputedStyle(textareaRef.current).fontSize.slice(0, -2)) * 2.6)
        if (textareaRef.current.style.height === `${fontSize}px`) {
            textareaRef.current.style.height = '1.9em'
        }
    }

    function handleBlur(e) {
        const newText = e.currentTarget.value
        if (newText !== todo.text) {
            editTodo(todo.id, newText)
        }
    }

    return (
            <motion.div
                layout
                initial='hidden'
                variants={taskVariants}
                animate={controls}
                css={[styles.todoTask, todo.finished ? styles.muted : null]}
            >
                <button
                    onClick={handleRemove}
                    disabled={removeLoading.some(id => id === todo.id)}
                    css={[styles.button, styles.removeButton]}
                >
                    <DeleteIcon/>
                </button>
                <textarea
                    onChange={handleTextareaResize}
                    onBlur={handleBlur}
                    onKeyPress={(e) => {
                        handleCtrlEnter(e)
                        handleQuotesKeypress(e)
                    }}
                    ref={textareaRef}
                    disabled={todo.finished}
                    defaultValue={todo.text}
                    rows={1}
                    spellCheck='false'
                    css={[styles.todoTaskInput, editLoading.some(id => id === todo.id) ? styles.muted : null, todo.finished ? styles.finishedTodoTaskInput : null]}
                />
                <button
                    onClick={handleFinish}
                    disabled={finishLoading.some(id => id === todo.id)}
                    css={[styles.button, styles.finishButton]}
                >
                        {todo.finished ? <CheckedBox/> : <UncheckedBox/>}
                </button>
            </motion.div>
    )
}


function TodoList({todos, removeLoading, finishLoading, editLoading, removeTodo, toggleFinishTodo, editTodo}) {    
    
    return (
        <motion.div layout transition={{duration: .2}} css={styles.todoList}>
        {
            todos.map((todo, todoIdx) => (
                <TodoItem key={`TodoItem${todo.id || todoIdx}`}
                    todo={todo}
                    removeLoading={removeLoading}
                    finishLoading={finishLoading}
                    editLoading={editLoading}
                    removeTodo={removeTodo}
                    toggleFinishTodo={toggleFinishTodo}
                    editTodo={editTodo}
                />
            ))
        }
    </motion.div>
    )
}

export default TodoList