import classnames from 'classnames'
import { useState, useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import styles from './Letter.module.css'

export default function Letter({ letter, handleLetterClick }) {

    const [isActive, setIsActive] = useState(false)

    const classes = classnames(styles.letterShape, { 
        [styles.keyLetter]: letter.isKey,
        [styles.activeLetter]: isActive
    })

    const handleTouchStart = useCallback(() => {
        if (isMobile) {
            setIsActive(true)
        }
    })

    const handleTouchEnd = useCallback(() => {
        if (isMobile) {
            handleLetterClick(letter.text)
            setIsActive(false)
        }
    }, [letter, handleLetterClick])

    const handleMouseEnter = useCallback(() => {
        if (!isMobile) {
            setIsActive(true)
        }
    })

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) {
            setIsActive(false)
        }
    })

    const handleClick = useCallback(() => {
        if (!isMobile) {
            handleLetterClick(letter.text)
        }
    }, [letter, handleLetterClick])

    return (
        <div className={styles.letterContainer}>
            <div className={classes}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleClick}
            >
                <span className={styles.letterContent}>{letter.text}</span>
            </div>
        </div>
    )
}