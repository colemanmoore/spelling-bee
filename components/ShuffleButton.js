import styled from 'styled-components';
import {paths} from '/constants';

export default function ShuffleButton({handler}) {

  return (
    <Container onClick={handler}>
      <img src={paths.SHUFFLE_PATH}/>
    </Container>
  );
}

const Container = styled.div`
  font-family: var(--font-family-notification);
  text-transform: uppercase;
  color: var(--foreground-color-1);
  cursor: pointer;
  width: 3em;
`;
