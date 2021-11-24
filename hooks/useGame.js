import { createContext, useContext, useState, useEffect } from 'react'

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

    return {
        initialize,
        letters,
        possibleScore,
        hasLetter
    }
}