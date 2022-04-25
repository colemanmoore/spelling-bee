import {createContext, useContext, useReducer} from 'react';
import {
  playerReducer,
  actions,
  initialState,
} from 'context/reducers/playerReducer';

const PlayerContext = createContext(initialState);

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({children}) => {

  const [state, dispatch] = useReducer(playerReducer, initialState);

  function updatePlayer(wordsFound, score) {
    dispatch({type: actions.UPDATE_PLAYER, payload: {wordsFound, score}});
  }

  function foundNewWord(word, wordScore) {
    dispatch({type: actions.ADD_FOUND_WORD, payload: word});
    dispatch({type: actions.ADD_TO_SCORE, payload: wordScore});
  }

  return (
    <PlayerContext.Provider value={{
      score: state.score,
      hasFoundWord: state.hasFoundWord,
      wordsFoundStack: state.wordsFoundStack,
      wordsFoundAlpha: state.wordsFoundAlpha,
      updatePlayer,
      foundNewWord,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
