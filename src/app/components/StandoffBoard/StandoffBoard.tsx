import React, { useEffect } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { GameStatus, Gestures, retrieveOpponentGesture, selectGameState } from '../../store/game-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BasicHandGesture from '../HandGestures/BasicHandGesture/BasicHandGesture';
import PaperHandGesture from '../HandGestures/PaperHandGesture/PaperHandGesture';
import RockHandGesture from '../HandGestures/RockHandGesture/RockHandGesture';
import ScissorsHandGesture from '../HandGestures/ScissorsHandGesture/ScissorsHandGesture';
import StandoffGesture from '../StandoffGesture/StandoffGesture';
import StandoffPlayAgain from '../StandoffPlayAgain/StandoffPlayAgain';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem 0 5rem 0;
`;

const moveCircleDiameter = 10;

const gestureComponentFactory = (gesture?: Gestures): React.ReactNode => {
  switch (gesture) {
    case Gestures.paper:
      return <PaperHandGesture circleDiameter={moveCircleDiameter} hasHover={false} />;
    case Gestures.rock:
      return <RockHandGesture circleDiameter={moveCircleDiameter} hasHover={false} />;
    case Gestures.scissors:
      return <ScissorsHandGesture circleDiameter={moveCircleDiameter} hasHover={false} />;
    default:
      return <BasicHandGesture circleDiameter={moveCircleDiameter} hasHover={false} />;
  }
};

const StandoffBoard = () => {
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(retrieveOpponentGesture());
    }, 800);
  }, [dispatch]);

  const playerGestureComponent = useMemo(() => {
    return gestureComponentFactory(gameState.playerGesture);
  }, [gameState.playerGesture]);

  const opponentGestureComponent = useMemo(() => {
    return gestureComponentFactory(gameState.opponentGesture);
  }, [gameState.opponentGesture]);

  return (
    <Wrapper>
      <StandoffGesture header={'YOU PICKED'}>{playerGestureComponent}</StandoffGesture>
      {(gameState.status === GameStatus.win || gameState.status === GameStatus.lose || gameState.status === GameStatus.tie) && (
        <StandoffPlayAgain />
      )}
      <StandoffGesture header={'THE HOUSE PICKED'}>{opponentGestureComponent}</StandoffGesture>
    </Wrapper>
  );
};

export default StandoffBoard;
