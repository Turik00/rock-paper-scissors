import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { GameStatus } from '../../../common/types';
import { defaultColor } from '../../consts/css-consts';
import { playAgain, selectGameState } from '../../store/game-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const VictoryText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
`;

const Button = styled.button`
  background: transparent;
  color: ${defaultColor};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${defaultColor};
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: rgba(246, 246, 246, 0.4);
  }
  &: active {
    background-color: rgba(246, 246, 246, 0.2);
  }
`;

const StandoffPlayAgain = () => {
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  const playAgainHandler = useCallback(() => {
    dispatch(playAgain());
  }, [dispatch]);

  const victoryText = useMemo(() => {
    switch (gameState.status) {
      case GameStatus.win:
        return 'YOU WIN';
      case GameStatus.lose:
        return 'YOU LOSE';
      case GameStatus.tie:
        return 'TIE';
      default:
        break;
    }
  }, [gameState.status]);

  return (
    <Wrapper>
      <VictoryText>{victoryText}</VictoryText>
      <Button onClick={playAgainHandler}>PLAY AGAIN</Button>
    </Wrapper>
  );
};

export default StandoffPlayAgain;
