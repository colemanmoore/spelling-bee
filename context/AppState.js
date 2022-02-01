import { createContext, useContext, useState } from 'react'
import { usePlayerContext } from 'context/PlayerState'
import { useGameContext } from 'context/GameState'
import { useInput } from 'hooks/useInput'
import { gameService } from 'services/game'
import { MESSAGE_DURATION, MSG_ALREADY_FOUND, MSG_NO_KEY_LETTER, MSG_TOO_SHORT } from 'constants/constants'

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {

    const [isMessageShowing, setIsMessageShowing] = useState(false)
    const [isWordsListShowing, setIsWordsListShowing] = useState(false)
    const { content, keyPressed, addLetter, deleteLetter, pressLetter, unpressLetter, clear } = useInput()

    const { foundNewWord, hasFoundWord } = usePlayerContext()
    const { keyLetter } = useGameContext()

    function addLetterToInput(letter) {
        addLetter(letter)
        setIsMessageShowing(false)
    }

    function showMessage(message, location, duration) {
        console.log(`showMessage(${message})`)
        setIsMessageShowing(message)
        setTimeout(() => {
            setIsMessageShowing(false)
        }, duration) // validate duration
    }

    function showWordsList() {
        setIsWordsListShowing(true)
    }

    function hideWordsList() {
        setIsWordsListShowing(false)
    }

    async function submitWord(word) {
        let message, response

        if (word.length < 4) message = MSG_TOO_SHORT
        else if (word.indexOf(keyLetter.text) < 0) message = MSG_NO_KEY_LETTER
        else if (hasFoundWord[word]) message = MSG_ALREADY_FOUND

        if (!message) {
            try {
                response = await gameService.post(word)
            } catch (error) {
                console.error(error)
            }

            if (response.grade > 0) {
                message = `+${response.grade}${response.message ? '' + message : ''}`
                foundNewWord(word, response.grade)
            } else {
                message = response.message
            }
        }

        showMessage(message, null, MESSAGE_DURATION)
        // setTimeout(clear, MESSAGE_DURATION)
        clear()
    }


    return <AppContext.Provider value={{
        input: content,
        keyPressed,
        pressLetter,
        unpressLetter,
        addLetterToInput,
        deleteLetterFromInput: deleteLetter,
        clearInput: clear,
        submitWord,
        isMessageShowing,
        showMessage,
        isWordsListShowing,
        setIsWordsListShowing,
        showWordsList,
        hideWordsList
    }}>
        {children}
    </AppContext.Provider>
}