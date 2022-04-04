import { useMemo } from 'react'
import styled from 'styled-components'
import { useAppContext } from 'context/AppState'

export default function MessageDisplay() {
    const { isMessageShowing } = useAppContext()

    if (!isMessageShowing) return <></>

    const tilt = useMemo(() => Math.sign(Math.random() - 0.5), [isMessageShowing])

    return (
        <Container tilt={tilt} positioning='bottom:26%'>
            <div className="message-display-vertical-positioner">
                <div className="message-bubble">
                    <span>{isMessageShowing}</span>
                </div>
            </div>
        </Container>
    )
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
    margin-left: calc(${props => props.tilt} * 7.5em);

    .message-bubble {
        background-image: url("/images/Bubble.svg");
        background-repeat: no-repeat;
        background-size: contain;
        transform: rotate(${props => (props.tilt * 20)}deg);
        font-size: 1.75rem;
        width: 6em;
        height: 3.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .message-bubble span {
        padding: 0.5em;
    }
}
`