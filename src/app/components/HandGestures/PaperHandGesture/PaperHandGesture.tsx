import styled from 'styled-components';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const PaperBg = styled(BgBase)`
  background-image: url(/images/icon-paper.svg);
`;

const PaperHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture borderGradient="hsl(230, 89%, 62%),hsl(230, 89%, 65%)" circleDiameter={props.circleDiameter} hasHover={props.hasHover}>
      <PaperBg />
    </BasicHandGesture>
  );
};

export default PaperHandGesture;
