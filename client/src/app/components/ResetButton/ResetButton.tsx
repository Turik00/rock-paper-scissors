import { Button } from '../../consts/css-consts';
import useGameSocket from '../../hooks/useSocket';
import { opponentPlayerDisconnected as disconnectGame } from '../../store/game-slice';
import { useAppDispatch } from '../../store/hooks';

const ResetButton = () => {
  const dispatch = useAppDispatch();
  const socketHookOperations = useGameSocket()[1];

  const reloadGameHandler = () => {
    dispatch(disconnectGame());
    socketHookOperations.socketDisconnect();
  };
  return <Button onClick={reloadGameHandler}>Reload Game</Button>;
};

export default ResetButton;
