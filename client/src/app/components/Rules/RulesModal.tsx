import styled from 'styled-components';
import { ModalWrapper } from '../../consts/css-consts';
import { RulesModalProps } from '../GameArea/GameArea';


export const RulesHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  width: 30rem;
`;

export const RulesText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
`;

export const CloseButton = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(/images/icon-close.svg);
    cursor: pointer;
    &: hover, focus {
        border: 2px solid rgba(112, 76, 182, 0.4);
    }
    &: active {
        background-color: rgba(112, 76, 182, 0.2);
    }
`;

export const RulesDiagram = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    height: 25rem;
    background-image: url(/images/image-rules.svg);
    margin: 1rem 3rem 1rem 3rem;
`;

const RulesModal = (props: RulesModalProps) => {
  return (
    <ModalWrapper>
      <RulesHeader>
        <RulesText>Rules</RulesText>
        <CloseButton onClick={() => props.setShowModalHandler(false)}/>
      </RulesHeader>
      <RulesDiagram></RulesDiagram>
    </ModalWrapper>
  );
};

export default RulesModal;
