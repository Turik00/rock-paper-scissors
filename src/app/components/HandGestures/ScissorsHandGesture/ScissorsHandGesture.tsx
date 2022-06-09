import styled from 'styled-components';
import { Gestures } from '../../../store/game-slice';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const ScissorsBg = styled(BgBase)`
  background-image: url(/images/icon-scissors.svg);
`;

const ScissorsHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture
      borderGradient="hsl(39, 89%, 49%),hsl(40, 84%, 53%)"
      circleDiameter={props.circleDiameter}
      hasHover={props.hasHover}
      gesture={Gestures.scissors}
    >
      <ScissorsBg />
    </BasicHandGesture>
  );
};

export default ScissorsHandGesture;
