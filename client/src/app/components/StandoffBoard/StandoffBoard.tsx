import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { retrieveOpponentGesture, selectGameState } from '../../store/game-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BasicHandGesture from '../HandGestures/BasicHandGesture/BasicHandGesture';
import PaperHandGesture from '../HandGestures/PaperHandGesture/PaperHandGesture';
import RockHandGesture from '../HandGestures/RockHandGesture/RockHandGesture';
import ScissorsHandGesture from '../HandGestures/ScissorsHandGesture/ScissorsHandGesture';
import StandoffGesture from '../StandoffGesture/StandoffGesture';
import StandoffPlayAgain from '../StandoffPlayAgain/StandoffPlayAgain';
import { GameStatus, Gestures } from '../../../common/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-height: 550px) and (max-height: 650px){
    transform: scale(0.96);
  }

  @media screen and (min-height: 460px) and (max-height: 550px){
    transform: scale(0.85);
  }

  @media screen and (max-height: 460px){
    transform: scale(0.75);
  }
`;

const GesturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem 0 5rem 0;
  @media screen and (max-height: 450px) {
    margin: 0;
  }
`;

const moveCircleDiameter = 140;

enum PlayAgainMessageLocation {
  middle,
  bottom,
}

const gestureComponentFactory = (gesture?: Gestures): React.ReactNode => {
  switch (gesture) {
    case Gestures.paper:
      return <PaperHandGesture circleDiameter={moveCircleDiameter} isActive={false} />;
    case Gestures.rock:
      return <RockHandGesture circleDiameter={moveCircleDiameter} isActive={false} />;
    case Gestures.scissors:
      return <ScissorsHandGesture circleDiameter={moveCircleDiameter} isActive={false} />;
    default:
      return <BasicHandGesture circleDiameter={moveCircleDiameter} isActive={false} />;
  }
};

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const StandoffBoard = () => {
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();
  const [windowSize, setWindowSize] = useState<{ innerWidth: number; innerHeight: number }>(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', handleWindowResize);
    if (!gameState.isMultiplayer) {
      setTimeout(() => {
        dispatch(retrieveOpponentGesture());
      }, 800);
    }
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [dispatch, gameState.isMultiplayer]);

  const playerGestureComponent = useMemo(() => {
    return gestureComponentFactory(gameState.playerGesture);
  }, [gameState.playerGesture]);

  const opponentGestureComponent = useMemo(() => {
    return gestureComponentFactory(gameState.opponentGesture);
  }, [gameState.opponentGesture]);

  const showPlayAgainMessage = (location: PlayAgainMessageLocation): boolean => {
    let showMsg = false;
    if (windowSize.innerWidth > 500 && location === PlayAgainMessageLocation.middle) {
      showMsg = true;
    } else if (windowSize.innerWidth <= 500 && location === PlayAgainMessageLocation.bottom) {
      showMsg = true;
    }
    return showMsg && (gameState.status === GameStatus.win || gameState.status === GameStatus.lose || gameState.status === GameStatus.tie);
  };

  return (
    <Wrapper>
      <GesturesWrapper>
        <StandoffGesture header={'YOU PICKED'}>{playerGestureComponent}</StandoffGesture>
        {showPlayAgainMessage(PlayAgainMessageLocation.middle) && <StandoffPlayAgain />}
        <StandoffGesture header={`${gameState.isMultiplayer ? 'OTHER PLAYER' : 'THE HOUSE'} PICKED`}>
          {opponentGestureComponent}
        </StandoffGesture>
      </GesturesWrapper>
      {showPlayAgainMessage(PlayAgainMessageLocation.bottom) && <StandoffPlayAgain />}
    </Wrapper>
  );
};

export default StandoffBoard;
