import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useGame } from '../hooks/useGame'
import classnames from 'classnames'
import styles from './WordsFound.module.css'

export default function WordsFound() {

    const game = useGame()
    const wrapperRef = useRef()
    const [allWordsOpen, setAllWordsOpen] = useState(false)

    const onTouchStart = e => {
        if (isMobile) handleClick(e)
    }

    const onMouseDown = e => {
        if (!isMobile) handleClick(e)
    }

    const handleClick = e => {
        if (e.target !== wrapperRef.current) {
            setAllWordsOpen(false)
        } else if (game.wordsFoundAlpha.length) {
            setAllWordsOpen(true)
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

    function latestWords() {
        return game.wordsFoundStack.map(w =>
            <span key={w} className={styles.word}>{w}</span>
        )
    }

    function allWords() {
        const wordStyle = classnames(styles.word, styles.listWord)
        return (
            <div className={styles.allWordsContainer}>
                {game.wordsFoundAlpha.map(w => <div key={w} className={wordStyle}>{w}</div>)}
            </div>
        )
    }
    return (
        <section className='topSection'>
            {allWordsOpen && allWords()}
            <div className={styles.container} ref={wrapperRef}>
                {!allWordsOpen && latestWords()}
            </div>
        </section>
    )
}