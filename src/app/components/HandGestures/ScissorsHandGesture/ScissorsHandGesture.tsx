import styled from 'styled-components';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const ScissorsBg = styled(BgBase)`
  background-image: url(/images/icon-scissors.svg);
`;

const ScissorsHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture borderGradient="hsl(39, 89%, 49%),hsl(40, 84%, 53%)" circleDiameter={props.circleDiameter} hasHover={props.hasHover}>
      <ScissorsBg />
    </BasicHandGesture>
  );
};

export default ScissorsHandGesture;
