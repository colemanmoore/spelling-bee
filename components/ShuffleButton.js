import styled from 'styled-components'

export default function ShuffleButton({ buttonLabel, handler, color = "#FFFFFF" }) {

    return (
        <Container onClick={handler}>
            <svg viewBox="0 0 500 500">
                <path id="curve" d="M125,85 a60,60 0 1,0 -115,0" />
                <text width="500" fill={color}>
                    <textPath xlinkHref="#curve">
                        {buttonLabel}
                    </textPath>
                </text>
            </svg>
        </Container>
    )
}

const Container = styled.div`
font-family: var(--font-family-notification);
text-transform: uppercase;
/* font-size: 5rem; */
color: var(--foreground-color-1);
cursor: pointer;
width: 100px;
border: 1px solid red;
`