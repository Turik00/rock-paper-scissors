import styled from 'styled-components';
import { circleDiameter } from '../Moves/BasicMove/BasicMove';
import PaperMove from '../Moves/PaperMove/PaperMove';
import RockMove from '../Moves/RockMove/RockMove';
import ScissorsMove from '../Moves/ScissorsMove/ScissorsMove';

const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Triangle = styled.div`
    background-image: url(/images/bg-triangle.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width 80%;
    aspect-ratio: 1/1;
    position: relative;
`;

const TriangleBase = styled.div`
  position: absolute;
  width: 110%;
  left: -5%;
  display: flex;
`;
const TriangleTop = styled(TriangleBase)`
  justify-content: space-between;
  top: -${circleDiameter / 2}rem;
`;

const TriangleBottom = styled(TriangleBase)`
  justify-content: center;
  bottom: 0;
`;

const GameBoard = () => {
  return (
    <Wrapper>
      <Triangle>
        <TriangleTop>
          <PaperMove></PaperMove>
          <ScissorsMove></ScissorsMove>
        </TriangleTop>
        <TriangleBottom>
          <RockMove></RockMove>
        </TriangleBottom>
      </Triangle>
    </Wrapper>
  );
};

export default GameBoard;
