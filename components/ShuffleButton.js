import styled from 'styled-components'

export default function ShuffleButton({ handler }) {

    return (
        <Container onClick={handler}>
            <img src="/images/SpinEm.svg" />
        </Container>
    )
}

const Container = styled.div`
font-family: var(--font-family-notification);
text-transform: uppercase;
color: var(--foreground-color-1);
cursor: pointer;
width: 100px;
`