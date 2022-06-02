import {useMemo} from 'react';
import styled from 'styled-components';
import {useAppContext} from 'context/AppState';
import {images} from '/constants';

export default function MessageDisplay() {
  const {isMessageShowing} = useAppContext();
  const tilt = useMemo(() => Math.sign(Math.random() - 0.5), [isMessageShowing]);

  if (!isMessageShowing) return <></>;

  return (
    <Container tilt={tilt} positioning="bottom:10%">
      <div className="message-display-vertical-positioner">
        <div className="message-bubble">
          <span>{isMessageShowing}</span>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  ${props => props.positioning};
  z-index: 200;
  width: 100%;

  & > .message-display-vertical-positioner {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: calc(${props => props.tilt} * 4.5em);

    .message-bubble {
      background-image: url(${images.BUBBLE_PATH});
      background-repeat: no-repeat;
      background-size: contain;
      transform: rotate(${props => (props.tilt * 20)}deg);
      width: 10em;
      height: 6em;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .message-bubble span {
      padding: 1em 0.5em;
      font-size: 1.25em;
    }
  }

  @media screen and (min-width: 750px) {
    & > .message-display-vertical-positioner {
      margin-left: calc(${props => props.tilt} * 17em);
    }
  }
`;
