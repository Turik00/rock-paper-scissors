import styled from 'styled-components';
import { defaultColor } from '../../consts/css-consts';
import { RulesModalProps } from '../GameArea/GameArea';

export const RulesModalWrapper = styled.div`
  background: ${defaultColor};
  aspect-ratio: 1/1;
  width: 30vw;
  min-width: 20rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RulesHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
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
    width: 100%;
    height: 100%;
    background-image: url(/images/image-rules.svg);
    margin: 1rem 3rem 0 3rem;
`;

const RulesModal = (props: RulesModalProps) => {
  return (
    <RulesModalWrapper>
      <RulesHeader>
        <RulesText>Rules</RulesText>
        <CloseButton onClick={() => props.setShowModalHandler(false)}/>
      </RulesHeader>
      <RulesDiagram></RulesDiagram>
    </RulesModalWrapper>
  );
};

export default RulesModal;
