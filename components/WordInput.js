import styles from './WordInput.module.css'

export default function WordInput({ word }) {
    return (
        <div className={styles.container}>
            {word}
        </div>
    )
}