import styled from 'styled-components'
import { useAppContext } from 'context/AppState'

export default function MessageDisplay() {
    const { isMessageShowing } = useAppContext()

    if (!isMessageShowing) return <></>

    const positioning = 'bottom: 20%'

    return (
        <VerticalBox positioning={positioning}>
            <HorizontalBox>
                <Container>{isMessageShowing}</Container>
            </HorizontalBox>
        </VerticalBox>
    )
}

const VerticalBox = styled.div`
position: absolute;
${props => props.positioning};
z-index: 200;
width: 100%;
`

const HorizontalBox = styled.div`
position: relative;
display: flex;
flex-direction: row;
justify-content: center;
`

const Container = styled.div`
border: 1px solid;
background-color: green;
padding: 1em;
opacity: 0.8;
`