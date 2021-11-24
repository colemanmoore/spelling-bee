import { useEffect, useReducer } from 'react'
import { isMobile } from 'react-device-detect'
import { useGame } from '../hooks/useGame'

export default function useInput({ submitCallback }) {

    const ACTIONS = {
        ADD: 'add',
        DELETE: 'del',
        CLEAR: 'clear',
        PRESS: 'press',
        UNPRESS: 'unpress'
    }

    const EVENTS = {
        KEYDOWN: 'keydown',
        KEYUP: 'keyup'
    }

    const KEYS = {
        BACKSPACE: 'Backspace',
        ENTER: 'Enter'
    }

    const initialState = {
        content: '',
        keyPressed: null
    }

    const game = useGame()

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case ACTIONS.ADD:
                return { ...state, content: state.content + action.payload }
            case ACTIONS.DELETE:
                if (state.content.length <= 0) return { ...state }
                return { ...state, content: state.content.slice(0, -1) }
            case ACTIONS.CLEAR:
                return { ...state, content: '' }
            case ACTIONS.PRESS:
                return { ...state, keyPressed: action.payload }
            case ACTIONS.UNPRESS:
                return { ...state, keyPressed: null }
            default:
                throw new Error()
        }
    }, initialState)

    useEffect(() => {
        if (isMobile) {
            return () => { }
        } else {
            document.addEventListener(EVENTS.KEYDOWN, handleKeyDown)
            document.addEventListener(EVENTS.KEYUP, handleKeyUp)
            return () => {
                document.removeEventListener(EVENTS.KEYDOWN, handleKeyDown)
                document.removeEventListener(EVENTS.KEYUP, handleKeyUp)
            }
        }
    }, [state, state.content])

    function addLetterToInput(letter) {
        dispatch({ type: ACTIONS.ADD, payload: letter })
    }

    function deleteLetterFromInput() {
        dispatch({ type: ACTIONS.DELETE })
    }

    function clearInput() {
        dispatch({ type: ACTIONS.CLEAR })
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case KEYS.BACKSPACE:
                e.preventDefault()
                deleteLetterFromInput()
                break
            case KEYS.ENTER:
                e.preventDefault()
                handleEnter()
                break
            default:
                if (game.hasLetter[e.key]) {
                    e.preventDefault()
                    dispatch({ type: ACTIONS.PRESS, payload: e.key })
                    addLetterToInput(e.key.toLowerCase())
                }
        }
    }

    function handleKeyUp() {
        dispatch({ type: ACTIONS.UNPRESS })
    }

    const handleEnter = () => {
        submitCallback(state.content)
        clearInput()
    }

    return {
        content: state.content,
        keyPressed: state.keyPressed,
        addLetterToInput,
        deleteLetterFromInput,
        clearInput
    }
}