import styled from 'styled-components';
import PaperHandGesture from '../HandGestures/PaperHandGesture/PaperHandGesture';
import RockHandGesture from '../HandGestures/RockHandGesture/RockHandGesture';
import StandoffGesture from '../StandoffGesture/StandoffGesture';
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
      <StandoffGesture header={'YOU PICKED'}>
        <PaperHandGesture circleDiameter={moveCircleDiameter} hasHover={false}/>
      </StandoffGesture>
      <StandoffPlayAgain />
      <StandoffGesture header={'THE HOUSE PICKED'}>
        <RockHandGesture circleDiameter={moveCircleDiameter} hasHover={false}/>
      </StandoffGesture>
    </Wrapper>
  );
};

export default StandoffBoard;
