import styled from 'styled-components';
import { RulesModalProps } from '../GameArea/GameArea';

const Wrapper = styled.span`
  outline: hsl(217, 16%, 45%);
  outline-width: 0.15rem;
  outline-style: solid;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: fit-content;
  &: hover, focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }
  &: active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

const RulesButton = (props: RulesModalProps) => {
  return <Wrapper onClick={() => props.setShowModalHandler(true)}>RULES</Wrapper>;
};

export default RulesButton;
