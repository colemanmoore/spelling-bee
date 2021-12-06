import { Fragment, useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { useGame } from '../hooks/useGame'
import useApi from '../hooks/useApi'
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

const MESSAGE_DURATION = 1500

export default function Home() {

    const game = useGame()
    const api = useApi()
    const wordsFound = useWordsFound()
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

        if (wordsFound.hasWord(submission)) {
            messageFlash.setMessage(MESSAGE.already_found)
            return
        }

        const data = await api.postSubmission(submission)

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
            <Head>
                <title>Bee</title>
            </Head>
            <ScoreBoard score={score} />
            <WordsFound words={wordsFound.stack} alphabetical={wordsFound.alpha} />
            <GameBoard
                loading={api.isLoadingGame}
                handleSubmission={gradeSubmission}
                error={api.fetchGameError}
            />
            <MessageBoard message={messageFlash.currentMessage} />
        </Fragment>
    )
}
