import { useState, useEffect } from 'react'

export default function useKeyPress(targetKeys) {

    const [keyPressed, setKeyPressed] = useState(null)
    const [input, setInput] = useState('')

    const keyMap = targetKeys.reduce((state, curr) => {
        return {
            ...state,
            [curr]: true,
            [curr.toLowerCase()]: true
        }
    }, {})

    const addLetterToInput = letter => {
        setInput('' + input + letter)
    }

    const deleteLetterFromInput = () => {
        if (input.length > 0) {
            setInput(input.substring(0, input.length - 1))
        }
    }

    const clearInput = () => {
        setInput('')
    }

    function upHandler(e) {
        e.preventDefault()
        if (keyMap[e.key]) {
            setKeyPressed(e.key)
        }
    }

    useEffect(() => {
        if (keyPressed) {
            addLetterToInput(keyPressed.toUpperCase())
        }
    }, [keyPressed])

    useEffect(() => {
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return [input, addLetterToInput, deleteLetterFromInput, clearInput, keyPressed]
}