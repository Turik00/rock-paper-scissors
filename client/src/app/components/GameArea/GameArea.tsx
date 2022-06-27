import Header from '../Header/Header';
import styled from 'styled-components';
import RulesModal from '../Rules/RulesModal';
import GameDiagram from '../GameDiagram/GameDiagram';
import RulesButton from '../Rules/RulesButton';
import React, { useMemo, useState } from 'react';
import StandoffBoard from '../StandoffBoard/StandoffBoard';
import { useAppSelector } from '../../store/hooks';
import { selectGameState } from '../../store/game-slice';
import WaitingForPlayerToJoin from '../WaitingForPlayerToJoin/WaitingForPlayerToJoin';
import ChooseGameMode from '../ChooseGameMode/ChooseGameMode';
import ResetButton from '../ResetButton/ResetButton';
import { GameStatus } from '../../../common/types';

const marginSize = '2.5rem';
const Wrapper = styled.div`
  width: 35vw;
  min-width: 38rem;
  height: calc(100% - ${marginSize});
  margin: ${marginSize};
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    width: 90vw;
  }
`;

const ButtonsArea = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: 2.1rem;
`;

export interface RulesModalProps {
  setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameArea = () => {
  const gameState = useAppSelector(selectGameState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const detetmineGameStatus = useMemo<JSX.Element>(() => {
    switch (gameState.status) {
      case GameStatus.pendingPlayerGesture:
        return <GameDiagram />;
      case GameStatus.pendingGameModeSelection:
        return <ChooseGameMode />;
      case GameStatus.pendingOpponentToJoin:
        return <WaitingForPlayerToJoin />;
      default:
        return <StandoffBoard />;
    }
  }, [gameState.status]);
  return (
    <React.Fragment>
      <Wrapper>
        <Header />
        {detetmineGameStatus}
        <ButtonsArea>
          <ResetButton />
          <RulesButton setShowModalHandler={setShowModal} />
        </ButtonsArea>
      </Wrapper>
      {showModal ? <RulesModal setShowModalHandler={setShowModal} /> : null}
    </React.Fragment>
  );
};

export default GameArea;
