import { Fragment } from 'react'
import _ from 'underscore'
import GameBoard from '../components/GameBoard'
import Game from '../game/Game'
const game = new Game(true)

function Home({ nonKeyLetters, keyLetter, answers }) {

    return (
        <Fragment>
            <GameBoard nonKeyLetters={nonKeyLetters} keyLetter={keyLetter} />
            <section className="answersContainer">
                {Object.keys(answers).map(a => <li key={a}>{a}</li>)}
            </section>
        </Fragment>
    )
}

export function getStaticProps() {
    const letters = game.getAllLetters()
    const keyLetter = _.findWhere(letters, { isKey: true })
    const nonKeyLetters = letters.filter(l => !l.isKey)
    return {
        props: {
            nonKeyLetters,
            keyLetter,
            answers: game.answers
        },
        revalidate: 1
    }
}

export default Home