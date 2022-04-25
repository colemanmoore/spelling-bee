import {Fragment, useEffect} from 'react';
import Head from 'next/head';
import {useGameContext} from 'context/GameState';
import {AppProvider} from 'context/AppState';
import GameBoard from 'components/GameBoard';
import ScoreBoard from 'components/ScoreBoard';
import WordsFound from 'components/WordsFound';
import Loading from 'components/Loading';
import MessageDisplay from 'components/MessageDisplay';
import Error from 'components/Error';

export default function Home() {

  const {loadGame, loadingGame, errorLoadingGame} = useGameContext();

  useEffect(loadGame, []);

  return (
    <Fragment>
      <Head>
        <title>SG Bee</title>
      </Head>
      <AppProvider>
        <main className="app">
          {loadingGame ? <Loading/> : (
            <section className="home-screen">
              <ScoreBoard/>
              {errorLoadingGame ? <Error /> : <GameBoard />}
              <MessageDisplay/>
            </section>
          )}
          <WordsFound/>
        </main>
      </AppProvider>
    </Fragment>
  );
}
