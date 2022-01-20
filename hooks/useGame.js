import { createContext, useContext, useState, useEffect } from 'react'
import useApi from './useApi'
import useStorage from './useStorage'

const gameContext = createContext()
export const useGame = () => useContext(gameContext)

export function ProvideGame({ children }) {
    const game = useProvideGame()
    return <gameContext.Provider value={game}>
        {children}
    </gameContext.Provider>
}

function useProvideGame() {

    const api = useApi()
    const storage = useStorage()
    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: null })
    const [possibleScore, setPossibleScore] = useState(null)
    const [hasLetter, setHasLetter] = useState({})
    const [hasWord, setHasWord] = useState({})
    const [wordsFoundStack, setWordsFoundStack] = useState([])
    const [wordsFoundAlpha, setWordsFoundAlpha] = useState([])
    const [score, setScore] = useState(0)

    async function initialize() {
        let keyLetter, nonKeyLetters = [], _hasLetter = {}

        try {
            const data = await api.fetchGame()
            data.letters.forEach(l => {
                if (l.isKey) {
                    keyLetter = l
                } else {
                    nonKeyLetters.push(l)
                }
                _hasLetter[l.text] = true
            })

            setLetters({ nonKeyLetters, keyLetter })

            setHasLetter(_hasLetter)
    
            setPossibleScore(data.maxScore)
    
            const sessionGameId = storage.getGame()
            if (sessionGameId && sessionGameId === data.id) {
                const words = await storage.getWords()
                const score = storage.getScore()
                setWordsFoundStack(words)
                setScore(score)
            } else {
                storage.resetGame(data.id)
            }
        } catch(err) {
            return
        }
    }

    useEffect(() => {
        const hash = wordsFoundStack.reduce((prev, curr) => ({...prev, [curr]: true}), {})
        const alpha = [].concat(wordsFoundStack).sort(sorter)
        setHasWord(hash)
        setWordsFoundAlpha(alpha)
    }, [wordsFoundStack])

    function addWord(word, score) {
        if (hasWord[word]) return
        setWordsFoundStack(prevList => prevList.concat([word]))
        setScore(prev => {
            storage.saveScore(prev + score)
            return prev + score
        })
        storage.saveWord(word)
    }

    function sorter(a, b) {
        if (a < b) return -1
        if (b < a) return 1
        return 0
    }

    return {
        initialize,
        letters,
        possibleScore,
        hasLetter,
        addWord,
        hasWord,
        wordsFoundStack,
        wordsFoundAlpha,
        score
    }
}