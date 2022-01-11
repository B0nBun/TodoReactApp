/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const theme = {
    bg1: '#2f2f2f',
    bg2: '#3f3f3f',
    fg1:  '#f0f6f0',
    fg2:  '#f0f6f0',
}

// Something of a light theme
// const theme = {
//     bg1: '#e0e6e0',
//     bg2: '#d0d6d0',
//     fg1:  '#2f2f2f',
//     fg2:  '#2f2f2f',
// }

export { theme }

const styles = {
    todoForm : css`
    width: 100%;
    display: flex;
    gap: 1em;
    font-size: 1.5rem;
    & > * {
        font-size: inherit;
        padding: .3em .5em;
    }
    
    @media (max-width: 40rem) {
        flex-direction: column;
        gap: .5em;
    }
    `,
    input: css`
    width: 100%;
    outline: none;
    
    background: ${theme.bg1};
    color: ${theme.fg1};
    border-color: transparent;
    box-shadow: 0 3px 7px -3px #0f0f0f;
    border-radius: .2em;
    
    transition:
        background .2s ease,
        color .2s ease,
        box-shadow .2s ease;
    
    &::placeholder {
        transition: color .2s ease;
        color: ${theme.fg1};
    }

    &::selection {
        background: ${theme.bg1};
        color: ${theme.fg1};
        border-radius: .2em;
    }
    
    &:focus {
        background: ${theme.fg1};
        color: ${theme.bg1};
        box-shadow: 0 0 10px 0px black;
        &::placeholder {
            color: ${theme.bg1};
        }
    }
    `,
    todoTask: css`
    display: grid;
    grid-template:
        "remove text finish" / 2em auto 2em;
    gap: 1em;
    
    background: ${theme.bg2};
    padding: .3em .5em;
    border-radius: .2em;
    box-shadow: 0 3px 10px -3px black;
    
    color: ${theme.fg2};
    
    transition: opacity .2s ease;
    
    & > * {
        font-size: inherit;
        padding: .3em .5em;
    }

    @media (max-width: 40rem) {
        grid-template:
            "remove finish"
            "text text";
        gap: .5em;
    }
    `,
    todoTaskInput: css`
    grid-area: text;
    width: 100%;
    outline: none;
    
    resize: none;
    
    background: transparent;
    border-color: transparent;
    border-radius: .2em;
    color: ${theme.fg2};
    
    overflow-y: hidden; 
    
    transition: background .2s ease,
                color .2s ease;
    
    &::placeholder {
        transition: color .2s ease;
        color: ${theme.fg2};
    }
    
    &:focus {
        background: ${theme.fg1};
        color: ${theme.bg1};
        &::placeholder {
            color: ${theme.bg1};
        }
    }

    &::selection {
        background: ${theme.bg1};
        color: ${theme.fg1};
    }
    `,
    muted : css`
    opacity: .5;
    `,
    finishedTodoTaskInput : css`
    text-decoration: line-through;
    `,
    button : css`
    background: transparent;
    color: ${theme.fg1};
    border: transparent 1px solid;
    border-radius: .2em;
    
    height: 100%;
    padding: .3em;

    display: flex;
    align-items: center;
    justify-content: center;
    
    outline: none;
    cursor: pointer;
    
    transition: color .2s ease,
                background .2s ease,
                transform .1s ease;
    
    &:disabled {
        opacity: .5;
    }
    
    &:hover, &:focus, &:target {
        background: ${theme.fg1};
        color: ${theme.bg1};
    }

    &:active {
        transform: scale(.9);
    }
    `,
    elevatedButton: css`
    border-color: transparent;
    box-shadow: 0 3px 7px -3px #0f0f0f;
    border-radius: .2em;
    `,
    removeButton: css`
    grid-area: remove
    `,
    finishButton: css`
    grid-area: finish
    `,
    todoList : css`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    font-size: 1.3rem;
    & > * {
        font-size: inherit;
    }
    `,
    modalContentWrapper: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    `,
    modalLabel: css`
    color: ${theme.fg1};
    `,
    modalButtonList: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    `
}

export default styles