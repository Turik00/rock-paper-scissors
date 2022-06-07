import Header from '../Header/Header';
import styled from 'styled-components';
import RulesModal from '../Rules/RulesModal';
import GameBoard from '../GameBoard/GameBoard';
import RulesButton from '../Rules/RulesButton';
import React, { useState } from 'react';

const marginSize = '2.5rem';
const Wrapper = styled.div`
  width: 35vw;
  min-width: 20rem;
  height: calc(100% - ${marginSize});
  margin: ${marginSize};
  display: flex;
  flex-direction: column;
`;

const RulesArea = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 500px) {
    align-items: center;
    justify-content: center;
  }
`;

export interface RulesModalProps {
    setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameArea = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Wrapper>
        <Header />
        <GameBoard />
        <RulesArea>
          <RulesButton setShowModalHandler={setShowModal}/>
        </RulesArea>
      </Wrapper>
      {showModal ? <RulesModal setShowModalHandler={setShowModal}/> : null}
    </React.Fragment>
  );
};

export default GameArea;
