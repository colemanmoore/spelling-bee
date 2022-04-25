import {Fragment, useEffect} from 'react';
import Head from 'next/head';
import {useGameContext} from 'context/GameState';
import {AppProvider} from 'context/AppState';
import GameBoard from 'components/GameBoard';
import ScoreBoard from 'components/ScoreBoard';
import WordsFound from 'components/WordsFound';
import Loading from 'components/Loading';
import MessageDisplay from 'components/MessageDisplay';

export default function Home() {

  const {loadGame, isWaiting} = useGameContext();

  useEffect(loadGame, []);

  return (
    <Fragment>
      <Head>
        <title>Bee</title>
      </Head>
      <AppProvider>
        <main className="app">
          {isWaiting ? <Loading/> : (
            <section className="home-screen">
              <ScoreBoard/>
              <GameBoard/>
              <MessageDisplay/>
            </section>
          )}
          <WordsFound/>
        </main>
      </AppProvider>
    </Fragment>
  );
}
