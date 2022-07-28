import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Gestures } from '../../common/types';
import { backendSocketUrl } from '../consts/consts';
import {
  opponentPlayerDisconnected,
  selectMultiPlayer,
  selectOpponentGesture,
  setMultiplayerGameStarted,
  updateScoreForMultiplayer,
} from '../store/game-slice';
import { useAppDispatch } from '../store/hooks';

let multiplayerSocket: Socket | null;

function useGameSocket(): [
  Socket | null,
  { socketStartGame: () => void; socketPlayerMove: (gesture: Gestures) => void; socketDisconnect: () => void }
] {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSocket(() => {
      if (multiplayerSocket == null) {
        multiplayerSocket = io(backendSocketUrl);
      }
      return multiplayerSocket;
    });
  }, []);

  const socketStartGame = () => {
    socket?.on('startingGame', () => {
      multiplayerSocket?.on('playerStateUpdate', (payload: { opponentMove: Gestures; playerScore: number }) => {
        dispatch(selectOpponentGesture(payload.opponentMove));
        dispatch(updateScoreForMultiplayer(payload.playerScore));
      });
      dispatch(setMultiplayerGameStarted());
    });
    socket?.on('opponentDisconnect', () => {
      dispatch(opponentPlayerDisconnected());
    });
    dispatch(selectMultiPlayer());
  };

  const socketPlayerMove = (gesture: Gestures) => {
    multiplayerSocket?.emit('playerMove', gesture);
  };

  const socketDisconnect = () => {
    multiplayerSocket?.disconnect();
    multiplayerSocket = null;
  };

  const socketHookOperations = { socketStartGame, socketPlayerMove, socketDisconnect };
  return [socket, socketHookOperations];
}

export default useGameSocket;
