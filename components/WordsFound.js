import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { usePlayerContext } from 'context/PlayerState'
import { useAppContext } from 'context/AppState'
import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound() {

    const { wordsFoundAlpha, wordsFoundStack } = usePlayerContext()
    const { isWordsListShowing, showWordsList, hideWordsList } = useAppContext()
    const wrapperRef = useRef()
    const [allWordsOpen, setAllWordsOpen] = useState(false)

    const onTouchStart = e => {
        if (isMobile) handleClick(e)
    }

    const onMouseDown = e => {
        if (!isMobile) handleClick(e)
    }

    const handleClick = e => {
        if (e.target === wrapperRef.current || wrapperRef.current.contains(e.target)) {
            showWordsList()
        } else {
            hideWordsList()
        }
    }

    useEffect(() => {
        document.addEventListener('touchstart', onTouchStart)
        document.addEventListener('mousedown', onMouseDown)
        return () => {
            document.removeEventListener('touchstart', onTouchStart)
            document.removeEventListener('mousedown', onMouseDown)
        }
    }, [])

    function alphabeticalModal() {
        const wordStyle = classnames(styles.word, styles.listWord)
        return (
            <div className={styles.allWordsContainer}>
                {wordsFoundAlpha.map(w => <div key={w} className={wordStyle}>{w}</div>)}
            </div>
        )
    }

    function showAllWords() {
        return allWordsOpen && wordsFoundAlpha.length > 2
    }

    return (
        <section className='topSection'>
            {isWordsListShowing && alphabeticalModal()}
            <div className={styles.container} ref={wrapperRef}>
                {!isWordsListShowing && wordsFoundStack.map(w =>
                    <span key={w} className={styles.word}>{w}</span>
                )}
            </div>
        </section>
    )
}