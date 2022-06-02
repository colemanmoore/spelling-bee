import {memo} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Letter from 'components/Letter';
import {images} from '/constants';
import {useAppContext} from 'context/AppState';

const Flower = memo(({letters}) => {

  const {
    keyPressed,
    pressLetter,
    unpressLetter,
  } = useAppContext();

  return <Container>
    <div>{letters.slice(0, 2).map(l =>
      <Letter
        key={l.text}
        letter={l}
        isPressed={keyPressed === l.text}
        handlePress={pressLetter}
        handleUnpress={unpressLetter}
      />,
    )}</div>
    <div>{letters.slice(2, 5).map(l =>
      <Letter
        key={l.text}
        letter={l}
        isPressed={keyPressed === l.text}
        handlePress={pressLetter}
        handleUnpress={unpressLetter}
      />,
    )}</div>
    <div>{letters.slice(5, 7).map(l =>
      <Letter
        key={l.text}
        letter={l}
        isPressed={keyPressed === l.text}
        handlePress={pressLetter}
        handleUnpress={unpressLetter}
      />,
    )}</div>
    <ImageWrapper>
      <Image src={images.FLOWER} layout="fill" priority/>
    </ImageWrapper>
  </Container>;
});

export default Flower;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 2em 0 1em;
  height: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  z-index: -100;

  img {
    position: absolute;
    width: 16em;
  }
`;
