import { useState, useEffect, useCallback } from 'react'
import _ from 'underscore'
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
        shuffle()
    }, [game.letters])

    const shuffle = () => {
        const { nonKeyLetters, keyLetter } = game.letters
        if (nonKeyLetters.length && keyLetter) {
            const characters = _.shuffle(nonKeyLetters)
            characters.splice(3, 0, keyLetter)
            setOrderedLetters(characters)
        }
    }

    const submit = useCallback(() => {
        handleSubmission(input.content)
        input.clearInput()
    }, [input.content, input.clearInput, handleSubmission])

    return (
        <div className={styles.container}>
            <div className={styles.wordPad}>
                {loading ?
                    <Loading /> :
                    <section className={styles.honeycomb}>
                        {orderedLetters.map(l => (
                            <Letter
                                key={l.text}
                                letter={l}
                                isKeyPressed={input.keyPressed === l.text}
                                handlePress={input.addLetterToInput}
                            />
                        ))}
                    </section>
                }
            </div>
            <WordInput word={input.content} />
            <section className={styles.buttonArea}>
                <button onClick={input.deleteLetterFromInput}>Delete</button>
                <button onClick={shuffle}>@</button>
                <button onClick={submit}>Enter</button>
            </section>
        </div>
    )
}