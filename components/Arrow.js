import styled from 'styled-components'

export default function Arrow({ direction }) {
    if (direction < 0) return <LeftArrow />
    else return <RightArrow />
}

const LeftArrow = styled.div`
position: absolute;
margin-left: 3px;
margin-top: 10px;
width: 36px;
height: 1px;
background-color: currentColor;

&:before {
  content: '';
  position: absolute;
  left: 1px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-right: solid 1px currentColor;
  -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
}
`

const RightArrow = styled.div`
position: absolute;
margin-right: 2px;
margin-top: 10px;
width: 36px;
height: 1px;
background-color: currentColor;

&:before {
  content: '';
  position: absolute;
  right: 1px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-right: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}
`