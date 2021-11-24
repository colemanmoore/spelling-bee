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
    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: '' })
    const [possibleScore, setPossibleScore] = useState(null)

    return {
        letters,
        setLetters,
        possibleScore,
        setPossibleScore
    }
}