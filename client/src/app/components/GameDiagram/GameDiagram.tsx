import styled from 'styled-components';
import PaperHandGesture from '../HandGestures/PaperHandGesture/PaperHandGesture';
import RockHandGesture from '../HandGestures/RockHandGesture/RockHandGesture';
import ScissorsHandGesture from '../HandGestures/ScissorsHandGesture/ScissorsHandGesture';

const circleDiameter = 6;
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

const GameDiagram = () => {
  return (
    <Wrapper>
      <Triangle>
        <TriangleTop>
          <PaperHandGesture circleDiameter={circleDiameter}></PaperHandGesture>
          <ScissorsHandGesture circleDiameter={circleDiameter}></ScissorsHandGesture>
        </TriangleTop>
        <TriangleBottom>
          <RockHandGesture circleDiameter={circleDiameter}></RockHandGesture>
        </TriangleBottom>
      </Triangle>
    </Wrapper>
  );
};

export default GameDiagram;
