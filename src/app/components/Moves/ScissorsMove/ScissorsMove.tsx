import styled from 'styled-components';
import BasicMove, { BgBase } from '../BasicMove/BasicMove';

const ScissorsBg = styled(BgBase)`
  background-image: url(/images/icon-scissors.svg);
`;

const ScissorsMove = () => {
  return (
    <BasicMove borderGradient="hsl(39, 89%, 49%),hsl(40, 84%, 53%)">
      <ScissorsBg />
    </BasicMove>
  );
};

export default ScissorsMove;
