import { Fragment, useEffect, useCallback } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useGame } from 'hooks/useGame'
import useApi from 'hooks/useApi'
import useMessageFlash from 'hooks/useMessageFlash'
import GameBoard from 'components/GameBoard'
import ScoreBoard from 'components/ScoreBoard'
import WordsFound from 'components/WordsFound'
import MessageBoard from 'components/MessageBoard'
import { MSG_NO_KEY_LETTER, MSG_ALREADY_FOUND, MSG_TOO_SHORT } from 'constants/constants'

const MESSAGE_DURATION = 1500

export default function Home() {

    const game = useGame()
    const api = useApi()
    const messageFlash = useMessageFlash(MESSAGE_DURATION)

    useEffect(game.initialize, [])

    const gradeSubmission = useCallback(async submissionText => {
        const submission = submissionText.toLowerCase()

        if (submission.length < 4) {
            messageFlash.setMessage(MSG_TOO_SHORT)
            return
        }

        if (submission.indexOf(game.letters.keyLetter.text) < 0) {
            messageFlash.setMessage(MSG_NO_KEY_LETTER)
            return
        }

        if (game.hasWord[submission]) {
            messageFlash.setMessage(MSG_ALREADY_FOUND)
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
            <Container>
                <ScoreBoard score={game.score} />
                <WordsFound />
                <GameBoard
                    loading={api.isLoadingGame}
                    handleSubmission={gradeSubmission}
                    error={api.fetchGameError}
                />
                <MessageBoard message={messageFlash.currentMessage} />
            </Container>
        </Fragment>
    )
}

const Container = styled.section`
position: relative;
width: 100%;

> .topSection {
    height: 48px;
    margin: 0 auto 0.5em auto;
    background-color: rgb(61, 61, 61);
    width: 100%;

    > div {
        padding: 0.7em;
        margin-right: 0.7em;
        line-height: 1.5em;
    }
}
`
