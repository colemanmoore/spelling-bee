import {Fragment, useEffect, useMemo} from 'react';
import Head from 'next/head';
import {useAppContext} from 'context/AppState';
import {usePlayerContext} from 'context/PlayerState';
import GameBoard from 'components/GameBoard';
import ScoreBoard from 'components/ScoreBoard';
import WordsFound from 'components/WordsFound';
import Loading from 'components/Loading';
import MessageDisplay from 'components/MessageDisplay';
import Error from 'components/Error';

export default function Home() {

  const {score, wordsFoundAlpha} = usePlayerContext();
  const {setIsWordsListShowing, loadGame, loadingGame, errorLoadingGame} = useAppContext();

  const numberOfWordsFound = useMemo(() => wordsFoundAlpha.length,
    [wordsFoundAlpha]);

  const toggleWordsListShowing = () => {
    setIsWordsListShowing(prev => !prev);
  };

  useEffect(loadGame, []);

  return (
    <Fragment>
      <Head>
        <title>SG Bee</title>
      </Head>
      <main className="app">
        {loadingGame ? <Loading/> : (
          <section className="home-screen">
            <ScoreBoard
              score={score}
              wordsFound={numberOfWordsFound}
              handleWordsListToggle={toggleWordsListShowing}
            />
            {errorLoadingGame ? <Error/> : <GameBoard/>}
            <MessageDisplay/>
          </section>
        )}
        <WordsFound/>
      </main>
    </Fragment>
  );
}
