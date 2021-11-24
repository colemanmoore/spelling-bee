import classnames from 'classnames'
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ score, possibleScore }) {

    const classes = classnames('topSection')

    return <section className={classes}>
        <div className={styles.container}>
            <span className={styles.currentScore}>{score ? `${score} pt` : ''}</span>
            <span className={styles.possibleScore}>{possibleScore ? `~Queen~ ${possibleScore}` : ''}</span>
        </div>
    </section>
}