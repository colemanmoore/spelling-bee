import {useEffect, useRef} from 'react';
import {usePlayerContext} from 'context/PlayerState';
import {settings} from 'constants';

export default function useMessageFlash() {

  const {isShowingMessage, showMessage, hideMessage} = usePlayerContext();

  const setTimeoutRef = useRef();

  useEffect(() => {

    if (isShowingMessage) {
      const timeoutId = setTimeout(() => {
        hideMessage();
      }, settings.MESSAGE_DURATION);
      setTimeoutRef.current = timeoutId;
    }

    return () => clearTimeout(setTimeoutRef.current);

  }, [isShowingMessage]);

  return {
    isShowingMessage,
    setMessage: message => showMessage(message),
  };
}
