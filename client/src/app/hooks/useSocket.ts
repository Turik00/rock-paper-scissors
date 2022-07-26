import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { backendSocketUrl, globalExtended } from '../consts/consts';
import { opponentPlayerDisconnected, selectMultiPlayer, startMultiplayerGame } from '../store/game-slice';
import { useAppDispatch } from '../store/hooks';

declare var window: Window & globalExtended;

function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSocket((prevState) => {
      if (window.multiplayerSocket == null) {
        window.multiplayerSocket = io(backendSocketUrl);
      }
      return window.multiplayerSocket;
    });
  }, []);

  const socketStartGame = () => {
    socket?.on('startingGame', () => {
      dispatch(startMultiplayerGame());
    });
    socket?.on('opponentDisconnect', () => {
      dispatch(opponentPlayerDisconnected());
    });
    dispatch(selectMultiPlayer());
  };

  return {socket, socketStartGame};
}

export default useSocket;
