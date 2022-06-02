import {useMemo} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {images} from '/constants';

export default function ShuffleButton({handler}) {

  const image = useMemo(() => <Image src={images.SHUFFLE} />, []);

  return (
    <Container onClick={handler}>
      {image}
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
