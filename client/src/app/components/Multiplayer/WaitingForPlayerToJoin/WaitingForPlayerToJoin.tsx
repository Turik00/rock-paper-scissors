import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from 'styled-components';
import { defaultColor, ModalContentWrapper, narrowHeightScreenContentWrapper } from '../../../consts/css-consts';

const Wrapper = styled(ModalContentWrapper)`
  align-items: center;
  background: transparent;
  height: fit-content;
  ${narrowHeightScreenContentWrapper}
`;

const LoaderWrapper = styled.div`
  width: 100px;
  height: 150px;
`;

const Header = styled.p`
    font-size: 1.5em;
`;

const WaitingForPlayerToJoin = () => {
  return (
    <Wrapper>
      <Header>Waiting other player to join</Header>
      <LoaderWrapper>
        <PacmanLoader color={defaultColor} size={50} speedMultiplier={0.6} />
      </LoaderWrapper>
    </Wrapper>
  );
};

//https://openbase.com/js/react-spinners/documentation
//defaults:
// loading: true;
// color: "#000000";
// cssOverride: {}
// speedMultiplier: 1;

export default WaitingForPlayerToJoin;
