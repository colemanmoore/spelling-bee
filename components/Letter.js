import {memo} from 'react';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

const Letter = memo(({letter, isPressed, handlePress, handleUnpress}) => {

  const onTouchStart = e => {
    e.stopPropagation();
    if (isMobile) {
      handlePress(letter.text);
    }
  }

  const onTouchEnd = () => {
    if (isMobile) {
      handleUnpress(letter.text);
    }
  };

  const onMouseDown = () => {
    if (!isMobile) {
      handlePress(letter.text);
    }
  };

  const onMouseUp = () => {
    if (!isMobile) {
      handleUnpress(letter.text);
    }
  };

  return (
    <Container
      keyLetter={letter.isKey}
      active={isPressed}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="shape">
        <span>{letter.text}</span>
      </div>
    </Container>
  );
});

export default Letter;

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
