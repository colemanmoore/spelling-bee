import styled from 'styled-components'
import { useAppContext } from 'context/AppState'
import Letter from 'components/Letter'

export default function Flower({ letters }) {

    const { keyPressed, addLetterToInput } = useAppContext()

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

    return <Container>
        {letterColumn(letters.slice(0, 2))}
        {letterColumn(letters.slice(2, 5))}
        {letterColumn(letters.slice(5, 7))}
        <img src="/images/flower.svg" />
    </Container>
}

const Container = styled.section`
display: flex;
flex-flow: row wrap;
justify-content: center;
align-items: center;
margin: 2.5em 0;

img {
    position: absolute;
    width: 300px;
}
`