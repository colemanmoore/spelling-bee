import { Fragment, useState, useEffect, useCallback } from 'react'
import _ from 'underscore'
import useInput from '../hooks/useInput'
import { useGame } from '../hooks/useGame'
import Letter from './Letter'
import WordInput from './WordInput'
import styles from './GameBoard.module.css'

export default function GameBoard({ handleSubmission }) {

    const game = useGame()
    const input = useInput()
    
    const { nonKeyLetters, keyLetter } = game.letters
    const [orderedLetters, setOrderedLetters] = useState([])

    useEffect(() => {
        input.createKeyMap(nonKeyLetters, keyLetter)
        shuffle()
    }, [])

    const shuffle = useCallback(() => {
        const characters = _.shuffle(nonKeyLetters)
        characters.splice(3, 0, keyLetter)
        setOrderedLetters(characters)
    }, [nonKeyLetters, keyLetter, setOrderedLetters])

    const submit = useCallback(() => {
        handleSubmission(input.content)
        input.clearInput()

    }, [input.content, input.clearInput, handleSubmission])

    return (
        <Fragment>
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
            <WordInput word={input.content} />
            <section className={styles.buttonArea}>
                <button onClick={input.deleteLetterFromInput}>Delete</button>
                <button onClick={shuffle}>@</button>
                <button onClick={submit}>Enter</button>
            </section>
        </Fragment>
    )
}