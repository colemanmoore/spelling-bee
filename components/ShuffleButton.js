import styled from 'styled-components';
import Image from 'next/image';
import {images} from '/constants';

export default function ShuffleButton({handler}) {

  return (
    <Container onClick={handler}>
      <Image src={images.SHUFFLE}/>
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
