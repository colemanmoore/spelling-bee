import { useState, useCallback } from 'react'
import classnames from 'classnames'
import { isMobile } from 'react-device-detect'
import styles from './Letter.module.css'

export default function Letter({ letter, isKeyPressed, handlePress }) {

    const [isActive, setIsActive] = useState(false)

    const classes = classnames(styles.letterShape, { 
        [styles.keyLetter]: letter.isKey,
        [styles.activeLetter]: isActive || isKeyPressed
    })

    const handleTouchStart = useCallback(() => {
        if (isMobile) {
            setIsActive(true)
            handlePress(letter.text)
        }
    }, [setIsActive, handlePress])

    const handleTouchEnd = useCallback(() => {
        if (isMobile) {
            setIsActive(false)
        }
    }, [letter])

    const handleMouseEnter = useCallback(() => {
        if (!isMobile) {
            setIsActive(true)
        }
    }, [setIsActive])

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) {
            setIsActive(false)
        }
    }, [setIsActive])

    const handleClick = useCallback(() => {
        if (!isMobile) {
            handlePress(letter.text)
        }
    }, [letter, handlePress])

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