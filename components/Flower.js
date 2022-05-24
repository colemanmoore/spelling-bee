import {memo} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Letter from 'components/Letter';
import {paths} from '/constants';

const Flower = memo( ({letters}) => {

  return <Container>
    <div>{letters.slice(0, 2).map(l => <Letter key={l.text} letter={l} />)}</div>
    <div>{letters.slice(2, 5).map(l => <Letter key={l.text} letter={l} />)}</div>
    <div>{letters.slice(5, 7).map(l => <Letter key={l.text} letter={l} />)}</div>
    <Image src={paths.FLOWER_PATH} layout="fill" priority />
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

  img {
    position: absolute;
    width: 16em;
    z-index: -10;
  }
`;
