import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { useGameContext } from 'context/GameState'
import { AppProvider } from 'context/AppState'
import GameBoard from 'components/GameBoard'
import ScoreBoard from 'components/ScoreBoard'
import WordsFound from 'components/WordsFound'
import RulesAbout from 'components/RulesAbout'
import Loading from 'components/Loading'

export default function Home() {

    const { loadGame, isWaiting } = useGameContext()

    useEffect(loadGame, [])

    return (
        <Fragment>
            <Head>
                <title>Bee</title>
            </Head>
            {isWaiting ? <Loading /> : (
                <section className="home-screen">
                    <AppProvider>
                        <div className="home-container">
                            <ScoreBoard />
                            <GameBoard />
                        </div>
                        <WordsFound />
                        <RulesAbout />
                    </AppProvider>
                </section>
            )}
        </Fragment>
    )
}
