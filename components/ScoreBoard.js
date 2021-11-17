import classnames from 'classnames'
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ score, possibleScore }) {

    const classes = classnames('scoreboard')

    return <section className={classes}>
        <div className={styles.container}>
            <span class={styles.currentScore}>{score ? `${score} pt` : ''}</span>
            <span class={styles.possibleScore}>{possibleScore ? `~Queen~ ${possibleScore}` : ''}</span>
        </div>
    </section>
}