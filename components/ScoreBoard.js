import classnames from 'classnames'

export default function ScoreBoard({ score }) {

    const classes = classnames('scoreboard')
    
    return <section className={classes}>
        your score is {score}
    </section>
}