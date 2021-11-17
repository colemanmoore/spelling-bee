import { Fragment, useState, useEffect } from 'react'
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

    const shuffle = () => {
        const characters = _.shuffle(nonKeyLetters)
        characters.splice(3, 0, keyLetter)
        setOrderedLetters(characters)
    }

    const submit = () => {
        if (input.length < 4) {
            return
        }

        if (input.indexOf(keyLetter.text) < 0) {
            return
        }

        handleSubmission(input)
        clearInput()
    }

    return (
        <Fragment>
            <section className={styles.honeycomb}>            
                {orderedLetters.map(l => (
                    <Letter className="hi" key={l.text} letter={l} handleLetterClick={addLetterToInput} />
                ))}
            </section>
            <WordInput word={input} />
            <section className={styles.buttonArea}>
                <button onClick={deleteLetterFromInput}>Delete</button>
                <button onClick={shuffle}>@</button>
                <button onClick={submit}>Enter</button>
            </section>
        </Fragment>
    )
}