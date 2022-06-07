import styled from 'styled-components';
import BasicMove, { BgBase } from '../BasicMove/BasicMove';

const PaperBg = styled(BgBase)`
  background-image: url(/images/icon-paper.svg);
`;

const PaperMove = () => {
  return (
    <BasicMove borderGradient="hsl(230, 89%, 62%),hsl(230, 89%, 65%)">
      <PaperBg />
    </BasicMove>
  );
};

export default PaperMove;
