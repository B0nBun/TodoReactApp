import { theme } from './styles'
import { Global } from '@emotion/react'

export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// eslint-disable-next-line
String.prototype.insert = function(pos, ins) {
    const pre = this.slice(0, pos)
    const aft = this.slice(pos)
    return pre + ins + aft
}

export function handleQuotesKeypress(e) {
    const input = e.currentTarget
    const selectionStart = input.selectionStart
    const selectionEnd = input.selectionEnd
    const characters = ['`', "'", `"`]
    if ((characters.includes(e.key) || e.key === '(') && selectionStart !== selectionEnd) {
        e.preventDefault()
        input.value = input.value.insert(selectionStart, e.key)
        if (e.key === '(') {
            input.value = input.value.insert(selectionEnd + 1, ')')
        } else {
            input.value = input.value.insert(selectionEnd + 1, e.key)
        }
        input.setSelectionRange(selectionStart, selectionEnd + 2)
    }
}

export function CSSReset() {
    return (
        <Global styles={`
        *, *::after, *::before {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            min-width: 100vw;
        }

        textarea,
        input,
        select {
            margin: 0;
        }
        `}/>
    )
}

export function CSSGlobal() {
    return (
        <Global styles={`
        * {
            font-family: sans-serif;
        }
        
        body {
            background-color: ${theme.bg1};
            /*For framer-motion animations*/
            overflow-x: hidden;
        }

        @media (max-width: 600px) {
            html {
                font-size: 14px;
            }
        }
        `}/>
    )
}
