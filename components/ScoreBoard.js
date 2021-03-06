import {memo, useMemo, useState, useEffect} from 'react';
import styled from 'styled-components';
import {PERCENTAGES, TITLES} from 'constants/settings';
import {threeDigitNumberFormat} from 'services/util';
import {useAppContext} from '../context/AppState';

const ScoreBoard = memo(({score, wordsFound, handleWordsListToggle}) => {

  const {possibleScore} = useAppContext();
  const [title, setTitle] = useState(TITLES[0]);

  const winningPoints = useMemo(() =>
      Math.floor(possibleScore * PERCENTAGES[PERCENTAGES.length - 1]),
    [possibleScore],
  );

  const widthStyle = useMemo(() => {
    const percent = Math.floor(
      100 * score / possibleScore / PERCENTAGES[PERCENTAGES.length - 1]);
    return percent >= 1 ? {
      display: 'block',
      width: `${percent}%`,
    } : {};
  }, [score, possibleScore, PERCENTAGES]);

  useEffect(() => {
    const currentPercentage = score / winningPoints;
    let tempTitle = TITLES[0];
    for (const [idx, p] of PERCENTAGES.entries()) {
      if (currentPercentage > p) {
        tempTitle = TITLES[idx];
      } else {
        break;
      }
    }
    setTitle(tempTitle);
  }, [score, winningPoints, PERCENTAGES]);

  return (
    <SectionContainer>

      <TextContainer onClick={handleWordsListToggle}>
        <span>{threeDigitNumberFormat(score)}</span>
        <a>
          {threeDigitNumberFormat(wordsFound)} word{wordsFound != 1 ? 's' : ''}
        </a>
        <span>{title}</span>
      </TextContainer>

      <PillContainer>
        <div className="color-fill" style={widthStyle}></div>
      </PillContainer>

    </SectionContainer>
  );
});

export default ScoreBoard;

const SectionContainer = styled.section`
  flex-grow: 0;
  @media screen and (min-width: 475px) {
    flex-grow: 1;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 1.5em;
  font-size: 1.5em;
  padding: 0 0.5em;

  a {
    text-decoration: underline;
  }

  span {
    width: 33%;
    height: 2.5em;

    &:nth-child(2) {
      text-align: center;
    }

    &:nth-child(3) {
      text-align: right;
    }
  }
`;

const PillContainer = styled.div`
  border: 1px solid;
  border-radius: 2.5em;
  height: 2.5em;
  overflow: hidden;

  .color-fill {
    height: 100%;
    display: none;
    background-color: var(--background-color);
  }
`;
