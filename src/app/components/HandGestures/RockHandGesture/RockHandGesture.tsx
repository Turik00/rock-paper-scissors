import styled from 'styled-components';
import { Gestures } from '../../../store/game-slice';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const RockBg = styled(BgBase)`
  background-image: url(/images/icon-rock.svg);
`;

const RockHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture
      borderGradient="hsl(349, 71%, 52%),hsl(349, 70%, 56%)"
      circleDiameter={props.circleDiameter}
      hasHover={props.hasHover}
      gesture={Gestures.rock}
    >
      <RockBg />
    </BasicHandGesture>
  );
};

export default RockHandGesture;
