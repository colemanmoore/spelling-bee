import styled from 'styled-components';

export default function WordInput({word}) {
  return (
    <Container>
      {word}
    </Container>
  );
}

const Container = styled.div`
  height: 2em;
  line-height: 2em;
  margin: 0 0 1em;
  text-align: center;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.5em;
  letter-spacing: 0.25rem;
  font-family: var(--font-family-heavy);
  border-bottom: 1px solid;

  ::after {
    content: '|';
    font-family: 'Courier';
    font-weight: 200;
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    0% {
      visibility: visible;
    }
    20% {
      visibility: hidden;
    }
    80% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
  }
`;
