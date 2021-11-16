import { Fragment, useState } from 'react'
import _ from 'underscore'
import GameBoard from '../components/GameBoard'
import ScoreBoard from '../components/ScoreBoard'
import WordsFound from '../components/WordsFound'
import Game from '../game/Game'
const game = new Game(true)

function Home({ nonKeyLetters, keyLetter, answers }) {

    const [score, setScore] = useState(0)
    const [wordsFound, setWordsFound] = useState([])

    const gradeSubmission = submission => {
        let grade = 0
        if (answers[submission.toLowerCase()]) {
            grade = submission.length < 5 ? 1 : submission.length
        }
        if (grade > 0) {
            setScore(score + grade)
            wordsFound.push(submission)
        }
    }

    return (
        <Fragment>
            <ScoreBoard score={score} />
            <WordsFound wordsFound={wordsFound} />
            <GameBoard nonKeyLetters={nonKeyLetters} keyLetter={keyLetter} handleSubmission={gradeSubmission} />
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