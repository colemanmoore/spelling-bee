import { useMemo } from 'react'
import styled from 'styled-components'
import { useGameContext } from 'context/GameState'
import { usePlayerContext } from 'context/PlayerState'
import { PERCENTAGES, TITLES } from 'constants/constants'
import { useAppContext } from 'context/AppState'
import { threeDigitNumberFormat } from 'lib/format'

export default function ScoreBoard() {

    const { possibleScore } = useGameContext()
    const { score, wordsFoundAlpha } = usePlayerContext()
    const { setIsWordsListShowing } = useAppContext()

    const winningPoints = useMemo(() =>
        Math.floor(possibleScore * PERCENTAGES[PERCENTAGES.length - 1]),
        [possibleScore]
    )

    const widthStyle = useMemo(() => {
        const percent = Math.floor(100 * score / winningPoints)
        return percent >= 1 ? {
            display: 'block',
            width: `${percent}%`
        } : {}
    }, [score, winningPoints])

    return (
        <SectionContainer>

            <TextContainer onClick={() => setIsWordsListShowing(true)}>
                <span>{threeDigitNumberFormat(score)}</span>
                <a>
                    {threeDigitNumberFormat(wordsFoundAlpha.length)} word{wordsFoundAlpha.length != 1 ? 's' : ''}
                </a>
                <span>{TITLES[0]}</span>
            </TextContainer>

            <PillContainer>
                <div className="color-fill" style={widthStyle}></div>
            </PillContainer>

        </SectionContainer>
    )
}

const SectionContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: flex-end;
`

const TextContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
line-height: 2.5rem;
padding: 0 0.5em;
font-size: calc(var(--font-size-base) * 1);

a { text-decoration: underline; }

span {
    width: 33%;
    height: 2.5em;
    &:nth-child(2) {
        text-align: center;
    }
    &:nth-child(3) {
        text-align: right;
    }
}
`

const PillContainer = styled.div`
border: 1px solid;
border-radius: 30px;
height: 3rem;
overflow: hidden;

.color-fill {
    height: 100%;
    display: none;
    background-color: var(--background-color);
}
`