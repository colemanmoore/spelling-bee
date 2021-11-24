import { Fragment, useState, useEffect, useCallback } from 'react'
import _ from 'underscore'
import Letter from './Letter'
import WordInput from './WordInput'
import useInput from '../hooks/useInput'
import styles from './GameBoard.module.css'

export default function GameBoard({ letters, handleSubmission }) {

    const { nonKeyLetters, keyLetter } = letters

    const [orderedLetters, setOrderedLetters] = useState([])

    const allTargetKeys = [].concat(nonKeyLetters.map(l => l.text)).concat([keyLetter.text])
    const [input, addLetterToInput, deleteLetterFromInput, clearInput, keyPressed] = useInput(allTargetKeys)

    useEffect(() => {
        shuffle()
    }, [])

    const shuffle = useCallback(() => {
        const characters = _.shuffle(nonKeyLetters)
        characters.splice(3, 0, keyLetter)
        setOrderedLetters(characters)
    }, [nonKeyLetters, keyLetter, setOrderedLetters])

    const submit = useCallback(() => {
        if (input.length < 4) {
            return
        }

        if (input.indexOf(keyLetter.text) < 0) {
            return
        }

        handleSubmission(input)
        clearInput()
        
    }, [input, handleSubmission, clearInput])

    const handleDelete = useCallback(() => {
        deleteLetterFromInput()
    }, [deleteLetterFromInput])

    return (
        <Fragment>
            <section className={styles.honeycomb}>            
                {orderedLetters.map(l => (
                    <Letter key={l.text} letter={l} handleLetterClick={addLetterToInput} />
                ))}
            </section>
            <WordInput word={input} />
            <section className={styles.buttonArea}>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={shuffle}>@</button>
                <button onClick={submit}>Enter</button>
            </section>
        </Fragment>
    )
}