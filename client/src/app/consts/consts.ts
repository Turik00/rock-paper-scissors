import { Socket } from 'socket.io-client';

export let backendSocketApi = 'wss://rock-paper-scissors-turik-serv.herokuapp.com/';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  backendSocketApi = 'ws://localhost:5000/';
}

export type globalExtended = typeof globalThis & {
  multiplayerSocket: Socket;
};
