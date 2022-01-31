import { useMemo } from 'react'
import { useGameContext } from 'context/GameState'
import { usePlayerContext } from 'context/PlayerState'
import styles from './ScoreBoard.module.css'
import { PERCENTAGES, TITLES } from 'constants/constants'

export default function ScoreBoard() {

    const { possibleScore } = useGameContext()
    const { score, wordsFoundAlpha } = usePlayerContext()

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

    function numberFormat(number) {
        let num = number.toString()
        while (num.length < 3) num = '0' + num
        return num
    }

    return <section className={styles.outerContainer}>

        <div className={styles.textContainer}>
            <span>{numberFormat(score)}</span>
            <span>{numberFormat(wordsFoundAlpha.length)} word{wordsFoundAlpha.length != 1 ? 's' : ''}</span>
            <span>{TITLES[0]}</span>
        </div>

        <div className={styles.pillContainer}>
            <div className={styles.colorContainer} style={widthStyle}> </div>
        </div>
    </section>
}