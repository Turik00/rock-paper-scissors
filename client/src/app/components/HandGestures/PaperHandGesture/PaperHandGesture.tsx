import styled from 'styled-components';
import { Gestures } from '../../../../common/types';
import BasicHandGesture, { BasicGestureProps, BgBase } from '../BasicHandGesture/BasicHandGesture';

const PaperBg = styled(BgBase)`
  background-image: url(/images/icon-paper.svg);
`;

const PaperHandGesture = (props: BasicGestureProps) => {
  return (
    <BasicHandGesture
      borderGradient="hsl(230, 89%, 62%),hsl(230, 89%, 65%)"
      circleDiameter={props.circleDiameter}
      isActive={props.isActive}
      gesture={Gestures.paper}
    >
      <PaperBg />
    </BasicHandGesture>
  );
};

export default PaperHandGesture;
