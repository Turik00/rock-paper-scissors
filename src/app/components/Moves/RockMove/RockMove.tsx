import styled from 'styled-components';
import BasicMove, { BgBase } from '../BasicMove/BasicMove';

const RockBg = styled(BgBase)`
  background-image: url(/images/icon-rock.svg);
`;

const RockMove = () => {
  return (
    <BasicMove borderGradient="hsl(349, 71%, 52%),hsl(349, 70%, 56%)">
      <RockBg />
    </BasicMove>
  );
};

export default RockMove;
