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

    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: '' })
    const [possibleScore, setPossibleScore] = useState(null)
    const [hasLetter, setHasLetter] = useState({})

    function initialize(letters) {
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
    }

    return {
        initialize,
        letters,
        setLetters,
        possibleScore,
        setPossibleScore,
        hasLetter
    }
}