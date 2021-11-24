import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound({ words, alphabetical }) {

    const [showAllWordsFound, setShowAllWordsFound] = useState(false)

    const handleTouchEnd = () => {
        if (isMobile) {
            setShowAllWordsFound(prev => !prev)
        }
    }

    const handleMouseDown = () => {
        if (!isMobile) {
            setShowAllWordsFound(prev => !prev)
        }
    }

    function latestWords() {
        return (
            <div className={styles.container}>
                {words.map(w =>
                    <span key={w} className={styles.word}>{w}</span>
                )}
            </div>
        )
    }

    function allWords() {
        const wordStyle = classnames(styles.word, styles.flexWord)
        return (
            <div className={styles.allWordsContainer}>
                {alphabetical.map(w =>
                    <div key={w} className={wordStyle}>{w}</div>
                )}
            </div>
        )
    }

    const outerClasses = classnames('topSection', styles.wordsFound, {
        [styles.opened]: showAllWordsFound
    })

    return (
        <section
            className={outerClasses}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
        >
            {showAllWordsFound ? allWords() : latestWords()}
        </section>
    )
}