import {createContext, useContext, useState} from 'react';
import {usePlayerContext} from 'context/PlayerState';
import {useGameContext} from 'context/GameState';
import {useInput} from 'hooks/useInput';
import {gameService} from 'services/game';
import {
  MESSAGE_DURATION,
  MSG_ALREADY_FOUND,
  MSG_NO_KEY_LETTER,
  MSG_TOO_SHORT,
} from 'constants/settings';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {

  const [isMessageShowing, setIsMessageShowing] = useState(false);
  const [isWordsListShowing, setIsWordsListShowing] = useState(false);
  const {
    content,
    keyPressed,
    addLetter,
    deleteLetter,
    pressLetter,
    unpressLetter,
    clear,
  } = useInput();

  const {foundNewWord, hasFoundWord} = usePlayerContext();
  const {keyLetter} = useGameContext();

  function addLetterToInput(letter) {
    addLetter(letter);
    setIsMessageShowing(false);
  }

  function showMessage(message, duration) {
    setIsMessageShowing(message);
    setTimeout(() => {
      setIsMessageShowing(false);
    }, duration); // validate duration
  }

  async function submitWord(word) {
    let message, response;

    if (word.length < 4) message = MSG_TOO_SHORT;
    else if (word.indexOf(keyLetter.text) < 0) message = MSG_NO_KEY_LETTER;
    else if (hasFoundWord[word]) message = MSG_ALREADY_FOUND;

    if (!message) {
      try {
        response = await gameService.post(word);
      } catch (error) {
        console.error(error);
      }

      if (response.grade > 0) {
        message = `+${response.grade}${response.message ? ' ' + response.message : ''}`;
        foundNewWord(word, response.grade);
      } else {
        message = response.message;
      }
    }

    showMessage(message, MESSAGE_DURATION);
    clear();
  }

  return <AppContext.Provider value={{
    input: content,
    keyPressed,
    pressLetter,
    unpressLetter,
    addLetterToInput,
    deleteLetterFromInput: deleteLetter,
    clearInput: clear,
    submitWord,
    isMessageShowing,
    showMessage,
    isWordsListShowing,
    setIsWordsListShowing
  }}>
    {children}
  </AppContext.Provider>;
};
