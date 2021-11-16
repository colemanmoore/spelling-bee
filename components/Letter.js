import classnames from 'classnames'
import styles from './Letter.module.css'

export default function Letter({ letter, handleLetterClick }) {

    const classes = classnames(styles.letterContainer, { [styles.keyLetter]: letter.isKey })

    function handleClick() {
        handleLetterClick(letter.text)
    }

    return (
        <div className={classes} onClick={handleClick} >
            <span>{letter.text}</span>
        </div>
    )
}