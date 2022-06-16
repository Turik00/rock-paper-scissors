import { useCallback } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { backendSocketApi, globalExtended } from '../../consts/consts';
import { Button } from '../../consts/css-consts';
import { opponentPlayerDisconnected, selectMultiPlayer, selectSinglePlayer, startMultiplayerGame } from '../../store/game-slice';
import { useAppDispatch } from '../../store/hooks';

declare var window: Window & globalExtended;

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GameModeButton = styled(Button)`
  width: 10.5rem;
`;

const ChooseGameMode = () => {
  const dispatch = useAppDispatch();

  const singlePlayerClickHandler = useCallback(() => {
    dispatch(selectSinglePlayer());
  }, [dispatch]);

  const multiPlayerClickHandler = useCallback(() => {
    const socket = io(backendSocketApi);
    socket.emit('joinRandomPlayer');
    socket.on('startingGame', () => {
      dispatch(startMultiplayerGame());
    });
    socket.on('opponentDisconnect', () => {
      dispatch(opponentPlayerDisconnected());
    });
    window.multiplayerSocket = socket;
    dispatch(selectMultiPlayer());
  }, [dispatch]);

  return (
    <Wrapper>
      <GameModeButton onClick={singlePlayerClickHandler}>Single player</GameModeButton>
      <br />
      <GameModeButton onClick={multiPlayerClickHandler}>Play against random player</GameModeButton>
    </Wrapper>
  );
};

export default ChooseGameMode;
