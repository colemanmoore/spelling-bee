import classnames from 'classnames'
import { useGame } from '../hooks/useGame'
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ score }) {

    const game = useGame()

    const classes = classnames('topSection')

    return <section className={classes}>
        <div className={styles.container}>
            <span className={styles.currentScore}>{score ? `${score} pt` : ''}</span>
            <span className={styles.possibleScore}>
                {game.possibleScore ? `~Genius ${Math.floor(game.possibleScore*0.7)} ` : ''}
                {game.possibleScore ? `~Queen ${game.possibleScore}` : ''}
            </span>
        </div>
    </section>
}