import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound({ words }) {

    const classes = classnames('wordsFound', styles.container)

    const handleOpen = () => {
        console.log(words)
    }

    return <section className="wordsFound">
        <div className={styles.container}>
            {words.map(w =>
                <span key={w} className={styles.word}>{w}</span>
            )}
        </div>
    </section>
}