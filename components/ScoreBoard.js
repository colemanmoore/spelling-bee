import { useMemo } from 'react'
import { useGameContext } from 'context/GameState'
import { usePlayerContext } from 'context/PlayerState'
import styles from './ScoreBoard.module.css'
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

    return <section className={styles.outerContainer}>

        <div className={styles.textContainer} onClick={() => setIsWordsListShowing(true) }>
            <span>{threeDigitNumberFormat(score)}</span>
            <a className={styles.wordsFoundLink}>
                {threeDigitNumberFormat(wordsFoundAlpha.length)} word{wordsFoundAlpha.length != 1 ? 's' : ''}
            </a>
            <span>{TITLES[0]}</span>
        </div>

        <div className={styles.pillContainer}>
            <div className={styles.colorContainer} style={widthStyle}> </div>
        </div>
    </section>
}