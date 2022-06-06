import {useState, useEffect} from 'react';
import {shuffle} from 'underscore';
import {useAppContext} from 'context/AppState';
import Arrow from 'components/Arrow';
import Flower from 'components/Flower';
import WordInput from 'components/WordInput';
import styled from 'styled-components';
import ShuffleButton from './ShuffleButton';

export default function GameBoard() {

  const {input, deleteLetter, submitWord, keyLetter, nonKeyLetters} = useAppContext();
  const [orderedLetters, setOrderedLetters] = useState([]);

  useEffect(() => {
    handleShuffle();
  }, [nonKeyLetters]);

  const handleShuffle = () => {
    if (nonKeyLetters.length && keyLetter) {
      const characters = shuffle(nonKeyLetters);
      characters.splice(3, 0, keyLetter);
      setOrderedLetters(characters);
    }
  };

  return (
    <Container>
      <Flower letters={orderedLetters}/>
      <WordInput word={input}/>
      <ControlArea>
        <Control align="left" onClick={deleteLetter}>
          <Arrow direction={-1}/>
          <ControlLabel>Delete</ControlLabel>
        </Control>
        <Control>
          <ShuffleButton handler={handleShuffle}/>
        </Control>
        <Control align="right" onClick={submitWord}>
          <Arrow direction={1}/>
          <ControlLabel>Enter</ControlLabel>
        </Control>
      </ControlArea>
    </Container>
  );
}

const Container = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
`;

const ControlArea = styled.section`
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props =>
          props.align == 'left' ?
                  'flex-start' :
                  (props.align === 'right' ? 'flex-end' : 'center')
  };
`;

const ControlLabel = styled.div`
  margin-top: 1.5em;
`;
