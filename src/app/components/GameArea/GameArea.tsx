import Header from '../Header/Header';
import styled from 'styled-components';
import RulesModal from '../Rules/RulesModal';
import GameDiagram from '../GameDiagram/GameDiagram';
import RulesButton from '../Rules/RulesButton';
import React, { useState } from 'react';
import StandoffBoard from '../StandoffBoard/StandoffBoard';

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

const RulesArea = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
`;

export interface RulesModalProps {
    setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: GameBoard or StandoffBoard will be selected by the state of the store
const GameArea = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Wrapper>
        <Header />
        <GameDiagram />
        {/* <StandoffBoard /> */}
        <RulesArea>
          <RulesButton setShowModalHandler={setShowModal}/>
        </RulesArea>
      </Wrapper>
      {showModal ? <RulesModal setShowModalHandler={setShowModal}/> : null}
    </React.Fragment>
  );
};

export default GameArea;
