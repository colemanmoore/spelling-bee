import { createContext, useContext, useState } from 'react'

const gameContext = createContext()
export const useGame = () => useContext(gameContext)

export function ProvideGame({ children }) {
    const game = useProvideGame()
    return <gameContext.Provider value={game}>
        {children}
    </gameContext.Provider>
}

function useProvideGame() {

    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: null })
    const [possibleScore, setPossibleScore] = useState(null)
    const [hasLetter, setHasLetter] = useState({})
    const [hasWord, setHasWord] = useState({})
    const [wordsFoundStack, setWordsFoundStack] = useState([])
    const [wordsFoundAlpha, setWordsFoundAlpha] = useState([])

    function initialize(letters = [], possibleScore = 0) {
        let key, nonKey = [], has = {}

        letters.forEach(l => {
            if (l.isKey) {
                key = l
            } else {
                nonKey.push(l)
            }
            has[l.text] = true
        })

        setLetters({
            nonKeyLetters: nonKey,
            keyLetter: key
        })
        setHasLetter(has)
        setPossibleScore(possibleScore || 0)
    }

    function addWord(word) {
        if (hasWord[word]) return
        setHasWord(prevHash => ({ ...prevHash, [word]: true }))
        setWordsFoundStack(prevList => prevList.concat([word]))
        setWordsFoundAlpha(prevList => prevList.concat([word]).sort(sorter))
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
        getThemWords: function() { return wordsFoundAlpha }
    }
}