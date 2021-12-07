import { Fragment, useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { useGame } from '../hooks/useGame'
import useApi from '../hooks/useApi'
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

const MESSAGE_DURATION = 1500

export default function Home() {

    const game = useGame()
    const api = useApi()
    const messageFlash = useMessageFlash(MESSAGE_DURATION)
    const [score, setScore] = useState(0)

    useEffect(async () => {
        const data = await api.fetchGame()
        if (data) {
            game.initialize(data.letters, data.maxScore)
        }
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

        if (game.hasWord[submission]) {
            messageFlash.setMessage(MESSAGE.already_found)
            return
        }

        const data = await api.postSubmission(submission)

        if (data.grade > 0) {
            setScore(score + data.grade)
            game.addWord(submission)
        }

        if (data.message) {
            messageFlash.setMessage(data.message)
        }
        
    }, [game, messageFlash])

    return (
        <Fragment>
            <Head>
                <title>Bee</title>
            </Head>
            <div className='container'>
                <ScoreBoard score={score} />
                <WordsFound />
                <GameBoard
                    loading={api.isLoadingGame}
                    handleSubmission={gradeSubmission}
                    error={api.fetchGameError}
                />
                <MessageBoard message={messageFlash.currentMessage} />
            </div>
        </Fragment>
    )
}
