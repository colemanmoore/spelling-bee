import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import {usePlayerContext} from 'context/PlayerState';
import {useGameContext} from 'context/GameState';
import {gameService} from 'services/game';
import {settings, events, keys} from 'constants';
import {isMobile} from 'react-device-detect';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {

  const {foundNewWord, hasFoundWord} = usePlayerContext();
  const {keyLetter, hasLetter} = useGameContext();
  const [input, setInput] = useState('');
  const [keyPressed, setKeyPressed] = useState(null);
  const [isMessageShowing, setIsMessageShowing] = useState(false);
  const [isWordsListShowing, setIsWordsListShowing] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener(events.KEYDOWN, handleKeyDown);
      document.addEventListener(events.KEYUP, handleKeyUp);
    }
    return () => {
      if (!isMobile) {
        document.removeEventListener(events.KEYDOWN, handleKeyDown);
        document.removeEventListener(events.KEYUP, handleKeyUp);
      }
    };
  }, []);

  function handleKeyDown(e) {
    // e.stopPropagation()
    switch (e.key) {
      case keys.BACKSPACE:
        e.preventDefault();
        deleteLetter();
        break;
      case keys.ENTER:
        e.preventDefault();
        submitWord();
        break;
      default:
        pressLetter(e.key);
    }
  }

  function handleKeyUp(e) {
    unpressLetter(e.key);
  }

  function deleteLetter() {
    setInput(prev => prev.slice(0, -1));
  }

  function clearInput() {
    setInput('');
  }

  function pressLetter(key) {
    setIsMessageShowing(false);
    console.log('has?', hasLetter[key.toLowerCase()]);
    if (hasLetter[key.toLowerCase()]) {
      setKeyPressed(key);
      setInput(prev => prev + key.toLowerCase());
    }
  }

  function unpressLetter() {
    setKeyPressed(null);
  }

  function showMessage(message, duration) {
    setIsMessageShowing(message);
    setTimeout(() => {
      setIsMessageShowing(false);
    }, duration);
  }

  async function submitWord() {
    console.log('submit:', input);
    let message, response;

    if (input.length < 4) message = settings.MSG_TOO_SHORT;
    else if (input.indexOf(keyLetter.text) <
      0) message = settings.MSG_NO_KEY_LETTER;
    else if (hasFoundWord[input]) message = settings.MSG_ALREADY_FOUND;

    if (!message) {
      try {
        response = await gameService.post(input);
      } catch (error) {
        console.error(error);
      }

      if (response.grade > 0) {
        message = `+${response.grade}${response.message ?
          ' ' + response.message :
          ''}`;
        foundNewWord(input, response.grade);
      } else {
        message = response.message;
      }
    }

    showMessage(message, settings.MESSAGE_DURATION);
    clearInput();
  }

  return <AppContext.Provider value={{
    input,
    keyPressed,
    pressLetter,
    unpressLetter,
    deleteLetter,
    clearInput,
    submitWord,
    isMessageShowing,
    showMessage,
    isWordsListShowing,
    setIsWordsListShowing,
  }}>
    {children}
  </AppContext.Provider>;
};
