import {createContext, useContext, useReducer, useState} from 'react';
import {GameReducer, actions, initialState} from 'context/reducers/gameReducer';
import {gameService} from 'services/game';

const GameContext = createContext(initialState);

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({children}) => {

  const [state, dispatch] = useReducer(GameReducer, initialState);
  const [isWaiting, setIsWaiting] = useState(false);

  async function loadGame(id) {
    setIsWaiting(true);

    try {
      let data;
      if (id) {
        data = await gameService.getById(id);
      } else {
        data = await gameService.getCurrent();
      }
      const {letters, maxScore} = data;
      dispatch(
        {
          type: actions.UPDATE_GAME,
          payload: {letters, possibleScore: maxScore},
        });

      // response should indicate if game id in request **cookie matched the game id in response
      // and if so, provide the player data sent in request cookie on response cookie
      // if the above holds, call function on player context to load player state from the cookie
      // otherwise player is at initial state

    } catch (error) {
      dispatch({
        type: actions.SET_HAS_ERROR, payload: true,
      });
    }

    setIsWaiting(false);
  }

  return (
    <GameContext.Provider value={{
      keyLetter: state.keyLetter,
      nonKeyLetters: state.nonKeyLetters,
      hasLetter: state.hasLetter,
      possibleScore: state.possibleScore,
      loadGame,
      isWaiting,
    }}>
      {children}
    </GameContext.Provider>
  );
};
