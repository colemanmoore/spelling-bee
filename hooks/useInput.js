import { useReducer } from 'react'

export const inputActions = {
    ADD: 'add',
    DELETE: 'del',
    CLEAR: 'clear',
    PRESS: 'press',
    UNPRESS: 'unpress'
}

export const inputInitialState = {
    content: '',
    keyPressed: null
}

export function useInput() {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {

            case inputActions.ADD:
                return { ...state, content: state.content + action.payload }

            case inputActions.DELETE:
                if (state.content.length <= 0) return { ...state }
                return { ...state, content: state.content.slice(0, -1) }

            case inputActions.CLEAR:
                return { ...state, content: '' }

            case inputActions.PRESS:
                return { ...state, keyPressed: action.payload }

            case inputActions.UNPRESS:
                return { ...state, keyPressed: null }
        }
    }, inputInitialState)

    function addLetter(letter) {
        dispatch({ type: inputActions.ADD, payload: letter })
    }

    function deleteLetter() {
        dispatch({ type: inputActions.DELETE })
    }

    function clear() {
        dispatch({ type: inputActions.CLEAR })
    }

    function pressLetter(key) {
        dispatch({ type: inputActions.PRESS, payload: key })
    }

    function unpressLetter(key) {
        dispatch({ type: inputActions.UNPRESS, payload: key })
    }

    return {
        ...state,
        addLetter,
        deleteLetter,
        pressLetter,
        unpressLetter,
        clear
    }
}