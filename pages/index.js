import { Fragment, useEffect, useCallback } from 'react'
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

    useEffect(game.initialize, [])

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

        let data = await api.postSubmission(submission)
        
        if (data && data.grade > 0) {
            game.addWord(submission, data.grade)
        }

        if (data && data.message) {
            messageFlash.setMessage(data.message)
        }
        
    }, [game, messageFlash])

    return (
        <Fragment>
            <Head>
                <title>Bee</title>
            </Head>
            <div className='container'>
                <ScoreBoard score={game.score} />
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
