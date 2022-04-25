import {useCallback} from 'react';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';
import {useAppContext} from 'context/AppState';

export default function Letter({letter}) {

  const {
    keyPressed,
    pressLetter,
    unpressLetter,
    addLetterToInput,
  } = useAppContext();

  const handleTouchStart = useCallback(e => {
    e.stopPropagation();
    if (isMobile) {
      pressLetter(letter.text);
      addLetterToInput(letter.text);
    }
  }, [addLetterToInput]);

  const handleTouchEnd = () => {
    if (isMobile) {
      unpressLetter(letter.text);
    }
  };

  const handleMouseDown = () => {
    if (!isMobile) {
      pressLetter(letter.text);
      addLetterToInput(letter.text);
    }
  };

  const handleMouseUp = () => {
    if (!isMobile) {
      unpressLetter(letter.text);
    }
  };

  return (
    <Container
      keyLetter={letter.isKey}
      active={keyPressed === letter.text}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="shape">
        <span>{letter.text}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5em 0.38em;
  box-sizing: unset;
  cursor: pointer;
  font-family: var(--font-family-heavy);

  .shape {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    line-height: 2em;
    text-align: center;
    font-size: 2.25em;
    text-transform: uppercase;
    ${props => props.active ?
            'background-color: var(--background-color);' :
            ''};
    ${props => props.keyLetter ? 'border: 1px solid;' : ''};
  }
`;
