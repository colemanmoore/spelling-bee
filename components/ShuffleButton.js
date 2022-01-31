import styles from './ShuffleButton.module.css'

export default function ShuffleButton({ buttonLabel, handler, color = "#FFFFFF" }) {

    return (
        <div className={styles.container} onClick={handler}>
            <svg viewBox="0 0 500 500">
                <path id="curve" d="M125,85 a60,60 0 1,0 -115,0" />
                <text width="500" fill={color}>
                    <textPath xlinkHref="#curve">
                        {buttonLabel}
                    </textPath>
                </text>
            </svg>
        </div>
    )
}