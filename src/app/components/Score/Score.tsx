import styled from 'styled-components';
import { defaultColor } from '../../consts/css-consts';
import { selectGameState } from '../../store/game-slice';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
  background-color: ${defaultColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  padding: 0.2rem 2rem 0.2rem 2rem;
`;

const ScoreSpan = styled.span`
  color: hsl(229, 64%, 46%);
  font-size: 0.8rem;
`;

const ScoreNumberSpan = styled(ScoreSpan)`
  font-size: 2.5rem;
`;

// TODO: ScoreNumberSpan will be recieved from the store
const Score = () => {
  const gameState = useAppSelector(selectGameState);
  return (
    <Wrapper>
      <ScoreSpan>score</ScoreSpan>
      <ScoreNumberSpan>{gameState.score}</ScoreNumberSpan>
    </Wrapper>
  );
};

export default Score;
