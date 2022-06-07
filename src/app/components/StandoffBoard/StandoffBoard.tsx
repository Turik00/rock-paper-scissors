import styled from 'styled-components';
import PaperMove from '../Moves/PaperMove/PaperMove';
import RockMove from '../Moves/RockMove/RockMove';
import StandoffPiece from '../StandoffPiece/StandoffPiece';
import StandoffPlayAgain from '../StandoffPlayAgain/StandoffPlayAgain';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem 0 5rem 0;
`;

const moveCircleDiameter = 10;

const StandoffBoard = () => {
  return (
    <Wrapper>
      <StandoffPiece header={'YOU PICKED'}>
        <PaperMove circleDiameter={moveCircleDiameter} hasHover={false}/>
      </StandoffPiece>
      <StandoffPlayAgain />
      <StandoffPiece header={'THE HOUSE PICKED'}>
        <RockMove circleDiameter={moveCircleDiameter} hasHover={false}/>
      </StandoffPiece>
    </Wrapper>
  );
};

export default StandoffBoard;
