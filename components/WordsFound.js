import styled from 'styled-components'
import { usePlayerContext } from 'context/PlayerState'
import { useAppContext } from 'context/AppState'
import { threeDigitNumberFormat } from 'lib/format'

export default function WordsFound() {

    const { wordsFoundAlpha } = usePlayerContext()
    const { isWordsListShowing, setIsWordsListShowing } = useAppContext()

    return (
        <Container active={isWordsListShowing}>
            <div className="close icon" onClick={() => setIsWordsListShowing(false) }></div>
            <h2>{threeDigitNumberFormat(wordsFoundAlpha.length)} words</h2>
            <ul>
                {wordsFoundAlpha.map(w => <li key={w}>{w}</li>)}
            </ul>
        </Container>
    )
}

const Container = styled.section`
position: absolute;
left: ${props => props.active ? '-15px' : 'calc(-35px - 50%)'};
top: -10px;
z-index: 100;
width: calc(50% + 15px);
height: calc(100% + 10px);
background-color: var(--background-color);
transition: left 0.5s;

color: var(--foreground-color-2);
padding: 2em;

ul {
    padding-left: 0;
}

li {
    font-family: var(--font-family-paragraph);
    font-size: 1.5rem;
    font-weight: 600;
    list-style: none;
    text-transform: uppercase;
    border-top: 1px solid;
    padding: 0.5em 0;
}

li:last-child {
    border-bottom: 1px solid;
}

&.drawer-open {
    left: -10px;
    top: -10px;
}

.close.icon {
    color: #000;
    position: absolute;
    right: 2em;
    margin-top: 0;
    margin-left: 0;
    width: 21px;
    height: 21px;
    cursor: pointer;
}

.close.icon:before {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
}

.close.icon:after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
}
`