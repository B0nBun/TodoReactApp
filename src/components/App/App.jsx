/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import TodoFormContainer from '../TodoForm/TodoFormContainer'
import TodoListContainer from '../TodoList/TodoListContainer'

// TODO: Implement Ctrl+Z (reducer is ok, but need to save the results in DataSource)

export default function App() {

    return (
        <motion.div
            css={css`
            max-width: 50rem;
            margin: 0 auto;
            padding: 1rem 2rem;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            `}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: .5}}}
        >
            <TodoFormContainer />
            <TodoListContainer />
        </motion.div>
    );
}