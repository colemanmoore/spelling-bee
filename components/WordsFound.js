import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound({ wordsFoundInsertionOrder }) {

    const classes = classnames('wordsFound', styles.container)

    const handleOpen = () => {
        
    }

    return <section className="wordsFound">
        <div className={styles.container}>
            {wordsFoundInsertionOrder.map(w =>
                <span key={w} className={styles.word}>{w}</span>
            )}
        </div>
    </section>
}