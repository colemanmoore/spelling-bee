import { Fragment, useState, useEffect } from 'react'
import _ from 'underscore'
import useWordsFound from '../hooks/useWordsFound'
import GameBoard from '../components/GameBoard'
import ScoreBoard from '../components/ScoreBoard'
import WordsFound from '../components/WordsFound'

function Home() {

    const [letters, setLetters] = useState({ nonKeyLetters: [], keyLetter: '' })
    const [score, setScore] = useState(0)
    const [possibleScore, setPossibleScore] = useState(null)
    const [wordsFound, addWord, wordsFoundInsertionOrder, wordsFoundAlpha] = useWordsFound()

    useEffect(async () => {
        const resp = await fetch('/api/current-game', { method: 'GET' })
        const data = await resp.json()
        const key = _.findWhere(data.letters, { isKey: true })
        const nonKey = data.letters.filter(l => !l.isKey)
        setLetters({
            nonKeyLetters: nonKey,
            keyLetter: key
        })
        setPossibleScore(data.maxScore)
    }, [])

    const gradeSubmission = async submission => {
        if (wordsFound.get(submission)) {
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
                addWord(submission.toLowerCase())
            }
        }
    }

    return (
        <Fragment>
            <ScoreBoard score={score} possibleScore={possibleScore} />
            <WordsFound wordsFoundInsertionOrder={wordsFoundInsertionOrder} />
            {letters.nonKeyLetters.length > 0 ?
                <GameBoard letters={letters} handleSubmission={gradeSubmission} /> :
                null
            }
        </Fragment>
    )
}

export default Home