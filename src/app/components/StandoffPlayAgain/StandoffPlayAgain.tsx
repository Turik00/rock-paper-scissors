import styled from 'styled-components';
import { defaultColor } from '../../consts/css-consts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const VictoryText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
`;

const Button = styled.button`
  background: transparent;
  color: ${defaultColor};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${defaultColor};
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: rgba(246, 246, 246, 0.4);
  }
  &: active {
    background-color: rgba(246, 246, 246, 0.2);
  }
`;

const StandoffPlayAgain = () => {
  return (
    <Wrapper>
      <VictoryText>{'YOU'} WIN</VictoryText>
      <Button>PLAY AGAIN</Button>
    </Wrapper>
  );
};

export default StandoffPlayAgain;
