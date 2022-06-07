import styled from 'styled-components';
import BasicMove, { BasicMoveProps, BgBase } from '../BasicMove/BasicMove';

const PaperBg = styled(BgBase)`
  background-image: url(/images/icon-paper.svg);
`;

const PaperMove = (props: BasicMoveProps) => {
  return (
    <BasicMove borderGradient="hsl(230, 89%, 62%),hsl(230, 89%, 65%)" circleDiameter={props.circleDiameter} hasHover={props.hasHover}>
      <PaperBg />
    </BasicMove>
  );
};

export default PaperMove;
