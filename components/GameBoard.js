import { useState, useEffect } from 'react'
import { shuffle } from 'underscore'
import { useGameContext } from 'context/GameState'
import { useAppContext } from 'context/AppState'
import useKeyboard from 'hooks/useKeyboard'
import Arrow from 'components/Arrow'
import Flower from 'components/Flower'
import WordInput from 'components/WordInput'
import styled from 'styled-components'
import RulesAboutLink from './RulesAboutLink'

export default function GameBoard() {

    const { hasLetter, keyLetter, nonKeyLetters } = useGameContext()
    const { input, deleteLetterFromInput, submitWord } = useAppContext()

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

    return (
        <Container>
            <RulesAboutLink />
            <Flower letters={orderedLetters} />
            <WordInput word={input} />
            <ControlArea>
                <Control align="left" onClick={deleteLetterFromInput}>
                    <Arrow direction={-1} />
                    <ControlLabel>Delete</ControlLabel>
                </Control>
                <Control align="right" onClick={handleSubmit}>
                    <Arrow direction={1} />
                    <ControlLabel>Enter</ControlLabel>
                </Control>
            </ControlArea>
        </Container>
    )
}

const Container = styled.div`
flex-grow: 3;
display: flex;
flex-direction: column;
`

const ControlArea = styled.section`
text-align: center;
display: flex;
justify-content: space-between;
font-size: 1.5rem;
` 

const Control = styled.div`
display: flex;
flex-direction: column;
align-items: ${props => 
    props.align=='left' ? 'flex-start' : (props.align==='right' ? 'flex-end' : 'center')
};
`

const ControlLabel = styled.div`
margin-top: 1.5em;
`