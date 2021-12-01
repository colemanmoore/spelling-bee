import { useState, useEffect, useCallback } from 'react'
import { shuffle } from 'underscore'
import useInput from '../hooks/useInput'
import { useGame } from '../hooks/useGame'
import Letter from './Letter'
import WordInput from './WordInput'
import Loading from './Loading'
import styles from './GameBoard.module.css'

export default function GameBoard({ handleSubmission, loading }) {

    const game = useGame()
    const input = useInput({ submitCallback: handleSubmission })
    const [orderedLetters, setOrderedLetters] = useState([])

    useEffect(() => {
        handleShuffle()
    }, [game.letters])

    const handleShuffle = () => {
        const { nonKeyLetters, keyLetter } = game.letters
        if (nonKeyLetters.length && keyLetter) {
            const characters = shuffle(nonKeyLetters)
            characters.splice(3, 0, keyLetter)
            setOrderedLetters(characters)
        }
    }

    const submit = useCallback(() => {
        handleSubmission(input.content)
        input.clearInput()
    }, [input.content, input.clearInput, handleSubmission])

    function letterColumn(range) {
        return <div>
            {range.map(l => (
                <Letter
                    key={l.text}
                    letter={l}
                    isKeyPressed={input.keyPressed === l.text}
                    handlePress={input.addLetterToInput}
                />
            ))}
        </div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.wordPad}>
                {loading || orderedLetters.length === 0 ?
                    <Loading /> :
                    <section className={styles.honeycomb}>
                        {letterColumn(orderedLetters.slice(0, 2))}
                        {letterColumn(orderedLetters.slice(2, 5))}
                        {letterColumn(orderedLetters.slice(5, 7))}
                    </section>
                }
            </div>
            <WordInput word={input.content} />
            <section className={styles.buttonArea}>
                <button onClick={input.deleteLetterFromInput}>{'<'}</button>
                <button onClick={handleShuffle}>@</button>
                <button onClick={submit}>{'>'}</button>
            </section>
        </div>
    )
}