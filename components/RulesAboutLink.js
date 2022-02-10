import styled from 'styled-components'

export default function RulesAboutLink() {
    return (
        <Container>
            Rules | About
        </Container>
    )
}

const Container = styled.div`
--font-size: 1em;
--height: 2em;
position: absolute;
right: 2.5em;
margin-top: 2em;
font-size: var(--font-size);
font-family: var(--font-family-paragraph);

.inner {
    position: relative;
    margin-right: 3em;

    span {
        position: absolute;
        display: inline-block;
        bottom: 0;
        vertical-align: top;
        height: var(--height);
        border: 1px solid red;
        line-height: calc((var(--height) * 2) - var(--font-size));
        transform-origin: bottom center;
        text-align: center;
    }

    span:nth-of-type(1) {
        transform: rotate(-275deg);
    }
    span:nth-of-type(2) {
        transform: rotate(-90deg);
    }
    span:nth-of-type(3) {
        transform: rotate(-45deg);
    }
    span:nth-of-type(4) {
        transform: rotate(5deg);
    }
    span:nth-of-type(5) {
        transform: rotate(10deg);
    }
}
`