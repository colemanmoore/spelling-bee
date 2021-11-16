import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound({ wordsFound }) {

    const classes = classnames('wordsFound')

    return <section className={classes}>
        {wordsFound.map(w => <span key={w} className={styles.word}>{w}</span>)}
    </section>
}