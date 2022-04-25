import styled from 'styled-components';

export default function Sidebar({children, percentWidth, active, handleClose}) {

  const width = `${percentWidth ? percentWidth : 50}%`;

  return (
    <Container
      width={width}
      left={active ? '-15px' : `calc(-35px - ${width})`}
    >
      <div className="close icon" onClick={handleClose}/>
      {children}
    </Container>
  );
}

const Container = styled.aside`
  position: absolute;
  height: calc(100% + 2em);
  width: calc(${props => props.width} + 15px);
  max-width: 450px;
  left: ${props => props.left};
  top: -10px;
  z-index: 100;
  background-color: var(--background-color);
  transition: left 0.25s;
  overflow: scroll;
  font-size: 1rem;

  color: var(--foreground-color-2);
  padding: 2em;

  &.drawer-open {
    left: -10px;
    top: -10px;
  }

  .close.icon {
    color: #000;
    position: absolute;
    right: 2em;
    margin-top: 0;
    margin-left: 0;
    width: 21px;
    height: 21px;
    cursor: pointer;
  }

  .close.icon:before {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .close.icon:after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
