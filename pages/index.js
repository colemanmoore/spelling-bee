import { Fragment, useState, useEffect } from 'react'
import _ from 'underscore'
import GameBoard from '../components/GameBoard'
import ScoreBoard from '../components/ScoreBoard'
import WordsFound from '../components/WordsFound'

function Home({ nonKeyLetters, keyLetter }) {

    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: '' })
    const [score, setScore] = useState(0)
    const [wordsFound, setWordsFound] = useState({})

    useEffect(async () => {
        const resp = await fetch('/api/current-game', { method: 'GET' })
        const data = await resp.json()
        const key = _.findWhere(data.letters, { isKey: true })
        const nonKey = data.letters.filter(l => !l.isKey)
        setLetters({
            nonKeyLetters: nonKey,
            keyLetter: key
        })
    }, [])

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
            { letters.nonKeyLetters.length > 0 ? <GameBoard letters={letters} handleSubmission={gradeSubmission} /> : null }
            {/* <section className="answersContainer">
                {Object.keys(answers).map(a => <li key={a}>{a}</li> )}
            </section> */}
        </Fragment>
    )
}

export default Home