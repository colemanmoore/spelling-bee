import { useMemo } from 'react'
import classnames from 'classnames'
import { useGame } from 'hooks/useGame'
import styles from './ScoreBoard.module.css'
import { PERCENTAGES, TITLES } from 'constants/constants'

export default function ScoreBoard({ score }) {

    const game = useGame()

    const geniusPoints = useMemo(() =>
        Math.floor(game.possibleScore * PERCENTAGES[PERCENTAGES.length - 1]),
        [game.possibleScore]
    )

    const percentToGenius = useMemo(() => Math.floor(100 * score / geniusPoints), [score, geniusPoints])

    const percentWidth = useMemo(() => {
        return percentToGenius >= 1 ? { display: 'block', width: `${percentToGenius}%` } : {}
    }, [percentToGenius])

    const classes = classnames('topSection', styles.outerContainer)

    return <section className={classes}>
        <div className={styles.colorContainer} style={percentWidth}> </div>
        <div className={styles.container}>
            <span className={styles.leftSide}>{score ? `${score}` : ''}</span>
            <span className={styles.rightSide}>
                {game.possibleScore ? `${geniusPoints} ${TITLES[TITLES.length - 1]}` : ''}
            </span>
        </div>
    </section>
}