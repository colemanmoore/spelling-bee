import { Fragment, useState, useEffect } from 'react'
import _ from 'underscore'
import Letter from './Letter'

export default function GameBoard({ nonKeyLetters, keyLetter }) {

    const [orderedLetters, setOrderedLetters] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        shuffle()
    }, [])

    const shuffle = () => {
        const letters = _.shuffle(nonKeyLetters) 
        letters.splice(3, 0, keyLetter)
        setOrderedLetters(letters)
    }

    const addLetterToInput = (letter) => {
        setInput(input + letter)
    }

    const submit = () => {
        console.log('submitting', input)
        setInput('')
    }

    return (
        <Fragment>
            <section>
                {orderedLetters.map(l => (
                    <Letter key={l.text} letter={l} handleLetterClick={addLetterToInput} />
                ))}
            </section>
            <div>{input}</div>
            <div>
                <button onClick={shuffle}>Shuffle</button>
            </div>
            <div>
                <button onClick={submit}>Enter</button>
            </div>
        </Fragment>
    )
}