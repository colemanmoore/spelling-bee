import { useMemo } from 'react'
import classnames from 'classnames'
import { useGame } from '../hooks/useGame'
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ score }) {

    const game = useGame()

    const geniusPoints = useMemo(() => Math.floor(game.possibleScore * 0.7), [game.possibleScore])

    const percentToGenius = useMemo(() => Math.floor(100 * score / geniusPoints), [score, geniusPoints])

    const percentWidth = useMemo(() => {
        if (percentToGenius < 1) {
            return {display:'none'}
        } else {
            return {width:`${percentToGenius}%`}
        }
    }, [percentToGenius])

    const classes = classnames('topSection', styles.outerContainer)

    return <section className={classes}>
        <div className={styles.colorContainer} style={percentWidth}> </div>
        <div className={styles.container}>
            <span className={styles.leftSide}>{score ? `${score}` : ''}</span>
            <span className={styles.rightSide}>
                {game.possibleScore ? `${geniusPoints} genius` : ''}
            </span>
        </div>
    </section>
}