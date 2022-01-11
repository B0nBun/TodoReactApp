import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const Backdrop = styled(motion.div)`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #000000a2;

display: flex;
align-items: center;
justify-content: center;
z-index: 100;
`

const ModalWrapper = styled(motion.div)`
background-color: #2f2f2f;

padding: 1rem 2rem;
font-size: 1.5rem;
border-radius: 1rem;

text-align: center;
width: clamp(40%, 400px, 90%);
`

const backdropVariants = {
    invisible: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: .2,
            when: 'beforeChildren'
        }   
    },
    exit: {
        opacity: 0
    }
}

const modalVariants = {
    invisible: {
        x: '-200%',
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: .2,
            type: 'spring',
            stiffness: 125,
            damping: 20,
            when: 'beforeChildren'
        }   
    },
    exit: {
        x: '200%',
        opacity: 0,
    }
}

const Modal = ({onBackdropClick,children}) => (
    <Backdrop variants={backdropVariants} initial='invisible' animate='visible' exit='exit' onClick={onBackdropClick}>
        <ModalWrapper variants={modalVariants} onClick={e => e.stopPropagation()}>{children}</ModalWrapper>
    </Backdrop>
)
export default Modal