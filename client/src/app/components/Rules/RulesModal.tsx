import styled from 'styled-components';
import Modal from '../../controls/Modal';
import { RulesModalProps } from '../GameArea/GameArea';


export const RulesDiagram = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    height: 25rem;
    background-image: url(/images/image-rules.svg);
    margin: 1rem 3rem 1rem 3rem;
`;

const RulesModal = (props: RulesModalProps) => {
  return (
    <Modal headerText='Rules' setShowModalHandler={props.setShowModalHandler}>
      <RulesDiagram></RulesDiagram>
    </Modal>
  );
};

export default RulesModal;
