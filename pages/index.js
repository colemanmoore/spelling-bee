import { Fragment, useState, useEffect, useCallback } from 'react'
import { useGame } from '../hooks/useGame'
import useWordsFound from '../hooks/useWordsFound'
import useMessageFlash from '../hooks/useMessageFlash'
import GameBoard from '../components/GameBoard'
import ScoreBoard from '../components/ScoreBoard'
import WordsFound from '../components/WordsFound'
import MessageBoard from '../components/MessageBoard'

const MESSAGE = {
    already_found: 'Already found',
    too_short: 'Word is too short',
    no_key_letter: 'Does not use center letter'
}

function Home() {

    const game = useGame()
    const [score, setScore] = useState(0)
    const wordsFound = useWordsFound()
    const messageFlash = useMessageFlash()

    useEffect(async () => {
        const resp = await fetch('/api/current-game', { method: 'GET' })
        const data = await resp.json()

        if (data.letters) {
            game.initialize(data.letters)
        }
        game.setPossibleScore(data.maxScore)
    }, [])

    const gradeSubmission = useCallback(async submissionText => {
        const submission = submissionText.toLowerCase()

        if (submission.length < 4) {
            messageFlash.setMessage(MESSAGE.too_short)
            return
        }

        if (submission.indexOf(game.letters.keyLetter.text) < 0) {
            messageFlash.setMessage(MESSAGE.no_key_letter)
            return
        }

        if (wordsFound.hasWord(submission)) {
            messageFlash.setMessage(MESSAGE.already_found)
            return
        }

        const resp = await fetch('/api/current-game', {
            method: 'POST',
            body: JSON.stringify({
                submission: submission
            })
        })

        const data = await resp.json()
        
        if (data.grade > 0) {
            setScore(score + data.grade)
            wordsFound.addWord(submission)
        }

        if (data.message) {
            messageFlash.setMessage(data.message)
        }
    }, [wordsFound, messageFlash])

    return (
        <Fragment>
            <ScoreBoard score={score} possibleScore={game.possibleScore} />
            <WordsFound words={wordsFound.stack} />
            {game.letters.nonKeyLetters.length > 0 ?
                <GameBoard handleSubmission={gradeSubmission} />
                : null
            }
            <MessageBoard message={messageFlash.currentMessage} />
        </Fragment>
    )
}

export default Home