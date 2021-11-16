import classnames from 'classnames'
import styles from './Letter.module.css'

export default function Letter({ letter, handleLetterClick }) {

    const classes = classnames(styles.letterShape, { [styles.keyLetter]: letter.isKey })

    function handleClick() {
        handleLetterClick(letter.text)
    }

    return (
        <div className={styles.letterContainer}>
            <div className={classes} onClick={handleClick} >
                <span className={styles.letterContent}>{letter.text}</span>
            </div>
        </div>
    )
}