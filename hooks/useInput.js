import { useState , useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'

// const inputContext = createContext()
// export const useInput = () => useContext(inputContext)

// export function ProvideInput({ children }) {
//     const input = useProvideInput()
//     return <inputContext.Provider value={input}>
//         {children}
//     </inputContext.Provider>
// }

export default function useInput() {

    const [keyPressed, setKeyPressed] = useState(null)
    const content = useRef('')
    let keyMap

    const addLetterToInput = letter => {
        console.log('add letter to input')
        setContent(content + letter.toLowerCase())
    }

    const deleteLetterFromInput = () => {
        if (content.length > 0) {
            setContent(content.slice(0, -1))
        }
    }

    const clearInput = () => {
        setContent('')
    }

    const createKeyMap = (nonKeyLetters, keyLetter) => {
        const targetKeys = [].concat(nonKeyLetters.map(l => l.text)).concat([keyLetter.text])
        keyMap = targetKeys.reduce((state, curr) => {
            return {
                ...state,
                [curr]: true
            }
        }, {})
    }

    const handleKeyDown = e => {
        // e.preventDefault()
        switch (e.key) {
            case 'Backspace':
                deleteLetterFromInput()
                break
            case 'Enter':
                handleReturn()
                break
            default:
                if (keyMap[e.key]) {
                    setKeyPressed(e.key)
                    addLetterToInput(e.key.toLowerCase())
                }
        }
    }

    const handleKeyUp = e => {
        // e.preventDefault()
        setKeyPressed(null)
    }

    const handleReturn = () => {
        console.log('return', content)
    }

    useEffect(() => {
        if (isMobile) {
            return () => {}
        } else {
            window.addEventListener('keydown', handleKeyDown)
            window.addEventListener('keyup', handleKeyUp)
            return () => {
                window.removeEventListener('keydown', handleKeyDown)
                window.removeEventListener('keyup', handleKeyUp)
            }
        }
    }, [])

    return {
        content,
        keyPressed,
        addLetterToInput,
        deleteLetterFromInput,
        clearInput,
        createKeyMap
    }
}