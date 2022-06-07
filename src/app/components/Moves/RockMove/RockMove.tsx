import styled from 'styled-components';
import BasicMove, { BasicMoveProps, BgBase } from '../BasicMove/BasicMove';

const RockBg = styled(BgBase)`
  background-image: url(/images/icon-rock.svg);
`;

const RockMove = (props: BasicMoveProps) => {
  return (
    <BasicMove borderGradient="hsl(349, 71%, 52%),hsl(349, 70%, 56%)" circleDiameter={props.circleDiameter} hasHover={props.hasHover}>
      <RockBg />
    </BasicMove>
  );
};

export default RockMove;
