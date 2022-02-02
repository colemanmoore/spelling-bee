import styled from 'styled-components'
import { usePlayerContext } from 'context/PlayerState'
import { useAppContext } from 'context/AppState'
import { threeDigitNumberFormat } from 'lib/format'
import Sidebar from 'components/Sidebar'

export default function WordsFound() {

    const { wordsFoundAlpha } = usePlayerContext()
    const { isWordsListShowing, setIsWordsListShowing } = useAppContext()

    return (
        <Sidebar active={isWordsListShowing} percentWidth={50} handleClose={() => setIsWordsListShowing(false)}>
            <h2>{threeDigitNumberFormat(wordsFoundAlpha.length)} words</h2>
            <List>
                {wordsFoundAlpha.map((w, i) => <li key={i}>{w}</li>)}
            </List>
        </Sidebar>
    )
}

const List = styled.ul`
padding-left: 0;

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
`