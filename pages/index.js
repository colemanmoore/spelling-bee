import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { useGameContext } from 'context/GameState'
import { AppProvider } from 'context/AppState'
import GameBoard from 'components/GameBoard'
import ScoreBoard from 'components/ScoreBoard'
import WordsFound from 'components/WordsFound'
import MessageBoard from 'components/MessageBoard'

export default function Home() {

    const { loadGame, isWaiting } = useGameContext()

    useEffect(loadGame, [])

    return (
        <Fragment>
            <Head>
                <title>Bee</title>
            </Head>
            {isWaiting ? (
                <section className="loading-screen">
                    <p>Please wait while we grab today's game...</p>
                </section>
            ) : (
                <section className="home-screen">
                    <AppProvider>
                        <ScoreBoard />
                        <WordsFound />
                        <GameBoard />
                        {/* <MessageBoard /> */}
                    </AppProvider>
                </section>
            )}
        </Fragment>
    )
}
