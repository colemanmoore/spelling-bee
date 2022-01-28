import { useState, useEffect } from 'react'
import { shuffle } from 'underscore'
import { useGameContext } from 'context/GameState'
import { useAppContext } from 'context/AppState'
import useKeyboard from 'hooks/useKeyboard'
import Letter from './Letter'
import WordInput from './WordInput'
import styles from './GameBoard.module.css'

export default function GameBoard() {

    const { hasLetter, keyLetter, nonKeyLetters } = useGameContext()
    const { input, keyPressed, addLetterToInput, deleteLetterFromInput, submitWord } = useAppContext()
    
    const [orderedLetters, setOrderedLetters] = useState([])
    const { addKeyboardListeners, removeKeyboardListeners } = useKeyboard(handleSubmit, hasLetter)

    useEffect(() => {
        addKeyboardListeners()
        return () => removeKeyboardListeners()
    }, [addKeyboardListeners, removeKeyboardListeners])

    useEffect(() => {
        handleShuffle()
    }, [nonKeyLetters])

    const handleShuffle = () => {
        if (nonKeyLetters.length && keyLetter) {
            const characters = shuffle(nonKeyLetters)
            characters.splice(3, 0, keyLetter)
            setOrderedLetters(characters)
        }
    }

    async function handleSubmit() {
        const submission = input.toLowerCase()
        submitWord(submission, keyLetter.text)
    }

    function letterColumn(range) {
        return <div>
            {range.map(l => (
                <Letter
                    key={l.text}
                    letter={l}
                    isKeyPressed={keyPressed === l.text}
                    handlePress={addLetterToInput}
                />
            ))}
        </div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.wordPad}>
                <section className={styles.honeycomb}>
                    {letterColumn(orderedLetters.slice(0, 2))}
                    {letterColumn(orderedLetters.slice(2, 5))}
                    {letterColumn(orderedLetters.slice(5, 7))}
                </section>
            </div>
            <WordInput word={input} />
            <section className={styles.buttonArea}>
                <button onClick={deleteLetterFromInput}>{'<'}</button>
                <button onClick={handleShuffle}>@</button>
                <button onClick={handleSubmit}>{'>'}</button>
            </section>
        </div>
    )
}