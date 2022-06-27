import { Socket } from 'socket.io-client';

const apiBase = 'rock-paper-scissors-turik-serv.herokuapp.com/';
export let backendSocketApi = `wss://${apiBase}`;
export let backendHttpApi = `https://${apiBase}`;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  backendSocketApi = `ws://localhost:5000/`;
  backendHttpApi = `http://localhost:5000/`;
}

export type globalExtended = typeof globalThis & {
  multiplayerSocket: Socket;
};
