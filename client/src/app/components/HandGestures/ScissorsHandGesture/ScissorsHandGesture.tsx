import styled from 'styled-components';
import {Gestures} from '../../../../common/types';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const ScissorsBg = styled(BgBase)`
  background-image: url(/images/icon-scissors.svg);
`;

const ScissorsHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture
      borderGradient="hsl(39, 89%, 49%),hsl(40, 84%, 53%)"
      circleDiameter={props.circleDiameter}
      isActive={props.isActive}
      gesture={Gestures.scissors}
    >
      <ScissorsBg />
    </BasicHandGesture>
  );
};

export default ScissorsHandGesture;
