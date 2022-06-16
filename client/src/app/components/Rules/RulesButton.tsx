import { Button } from '../../consts/css-consts';
import { RulesModalProps } from '../GameArea/GameArea';

const RulesButton = (props: RulesModalProps) => {
  return <Button onClick={() => props.setShowModalHandler(true)}>RULES</Button>;
};

export default RulesButton;
