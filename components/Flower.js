import styled from 'styled-components';
import Letter from 'components/Letter';
import {paths} from '/constants';

export default function Flower({letters}) {

  function letterColumn(range) {
    return <div>
      {range.map(l => (
        <Letter
          key={l.text}
          letter={l}
        />
      ))}
    </div>;
  }

  return <Container>
    {letterColumn(letters.slice(0, 2))}
    {letterColumn(letters.slice(2, 5))}
    {letterColumn(letters.slice(5, 7))}
    <img src={paths.FLOWER_PATH}/>
  </Container>;
}

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 2em 0 1em;
  height: 100%;

  img {
    position: absolute;
    width: 16em;
    z-index: -10;
  }
`;
