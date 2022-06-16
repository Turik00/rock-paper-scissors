import { Button } from '../../consts/css-consts';
import { opponentPlayerDisconnected as disconnectGame } from '../../store/game-slice';
import { useAppDispatch } from '../../store/hooks';

const ResetButton = () => {
  const dispatch = useAppDispatch();
  const reloadGameHandler = () => {
    dispatch(disconnectGame());
  };
  return <Button onClick={reloadGameHandler}>Reload Game</Button>;
};

export default ResetButton;
