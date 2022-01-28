import { isMobile } from 'react-device-detect'
import { useAppContext } from 'context/UiState'

export default function useKeyboard(handleEnter, hasLetter) {

    const { addLetterToInput, deleteLetterFromInput, pressLetter, unpressLetter } = useAppContext()

    const EVENTS = {
        KEYDOWN: 'keydown',
        KEYUP: 'keyup'
    }

    const KEYS = {
        BACKSPACE: 'Backspace',
        ENTER: 'Enter'
    }

    function addKeyboardListeners() {
        if (!isMobile) {
            document.addEventListener(EVENTS.KEYDOWN, handleKeyDown)
            document.addEventListener(EVENTS.KEYUP, handleKeyUp)
        }
    }

    function removeKeyboardListeners() {
        if (!isMobile) {
            document.removeEventListener(EVENTS.KEYDOWN, handleKeyDown)
            document.removeEventListener(EVENTS.KEYUP, handleKeyUp)
        }
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
                if (hasLetter[e.key.toLowerCase()]) {
                    e.preventDefault()
                    pressLetter(e.key)
                    addLetterToInput(e.key.toLowerCase())
                }
        }
    }

    function handleKeyUp(e) {
        unpressLetter(e.key)
    }

    return {
        addKeyboardListeners,
        removeKeyboardListeners
    }
}