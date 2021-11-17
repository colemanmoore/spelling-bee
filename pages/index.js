import { Fragment, useState, useEffect } from 'react'
import _ from 'underscore'
import GameBoard from '../components/GameBoard'
import ScoreBoard from '../components/ScoreBoard'
import WordsFound from '../components/WordsFound'

function Home({ nonKeyLetters, keyLetter }) {

    const [score, setScore] = useState(0)
    const [wordsFound, setWordsFound] = useState({})

    const gradeSubmission = async submission => {
        if (wordsFound[submission]) {
            console.log('Already found')
        } else {
            const resp = await fetch('/api/current-game', {
                method: 'POST',
                body: JSON.stringify({
                    submission: submission
                })
            })
            const data = await resp.json()
            if (data.grade > 0) {
                setScore(score + data.grade)
                setWordsFound({ ...wordsFound, [submission]: true })
            }
        }
    }

    return (
        <Fragment>
            <ScoreBoard score={score} />
            <WordsFound wordsFound={wordsFound} />
            <GameBoard nonKeyLetters={nonKeyLetters} keyLetter={keyLetter} handleSubmission={gradeSubmission} />
            {/* <section className="answersContainer">
                {Object.keys(answers).map(a => <li key={a}>{a}</li> )}
            </section> */}
        </Fragment>
    )
}

export async function getStaticProps() {
    const resp = await fetch('http://localhost:3000/api/current-game', {
        method: 'GET'
    })
    const data = await resp.json()
    const keyLetter = _.findWhere(data.letters, { isKey: true })
    const nonKeyLetters = data.letters.filter(l => !l.isKey)
    return {
        props: {
            nonKeyLetters: nonKeyLetters,
            keyLetter: keyLetter
        },
        revalidate: 3600
    }
}

export default Home