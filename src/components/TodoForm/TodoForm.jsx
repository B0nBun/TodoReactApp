/** @jsxImportSource @emotion/react */
import styles from '../styles'
import { handleQuotesKeypress } from '../Utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import { ImPlus as Plus, ImBlocked as Blocked } from 'react-icons/im'

export default function TodoForm({todos, addTodo, removeFinished, isAddedLoading, removeFinishedLoading}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const modalContentVariants = {
        invisible: {opacity: 0,},
        visible: {opacity: 1},
        exit: {opacity: 0}
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        addTodo(e.currentTarget.form.todoInput.value)
        e.currentTarget.form.todoInput.value = ''
    }

    function handleRemoveFinished(e) {
        e.preventDefault()
        setIsModalOpen(true)
    }

    
    return (
        <>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
        {            
            isModalOpen && (
                <Modal onBackdropClick={e => setIsModalOpen(false)} isModalOpen={isModalOpen}>
                        <motion.div variants={modalContentVariants} css={styles.modalContentWrapper}>
                            <motion.span css={styles.modalLabel}>
                                Do you want to remove all {todos.filter(todo => todo.finished).length} finished TODOs?
                            </motion.span>
                            <motion.div css={styles.modalButtonList}>
                                <motion.div 
                                    css={[styles.button, styles.elevatedButton]}
                                    onClick={e => {setIsModalOpen(false); removeFinished()}}
                                >
                                    Yes
                                </motion.div>
                                <motion.div 
                                    css={[styles.button, styles.elevatedButton]}
                                    onClick={e => setIsModalOpen(false)}
                                >
                                    No
                                </motion.div>
                            </motion.div>
                        </motion.div>
                </Modal>
            )
        }
        </AnimatePresence>
        
        <form css={styles.todoForm}>
            <input
                onKeyPress={handleQuotesKeypress}
                css={styles.input}
                placeholder="Todo"
                name='todoInput'
            />
            <button
                css={[styles.button, styles.elevatedButton]}
                disabled={isAddedLoading ? true : false}
                onClick={handleSubmit}
            >
                <Plus/>
            </button>
            <button
                onClick={handleRemoveFinished}
                disabled={removeFinishedLoading}
                css={[styles.button, styles.elevatedButton]}
            >
                <Blocked />
            </button>
        </form>
        </>
    )
}