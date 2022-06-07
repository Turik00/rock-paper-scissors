import styled from 'styled-components';
import BasicMove, { BasicMoveProps, BgBase } from '../BasicMove/BasicMove';

const ScissorsBg = styled(BgBase)`
  background-image: url(/images/icon-scissors.svg);
`;

const ScissorsMove = (props: BasicMoveProps) => {
  return (
    <BasicMove borderGradient="hsl(39, 89%, 49%),hsl(40, 84%, 53%)" circleDiameter={props.circleDiameter} hasHover={props.hasHover}>
      <ScissorsBg />
    </BasicMove>
  );
};

export default ScissorsMove;
