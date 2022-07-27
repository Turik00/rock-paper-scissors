import { Socket } from 'socket.io-client';

// Heroku backend
const urlBase = 'rock-paper-scissors-turik-serv.herokuapp.com/';
export let backendSocketUrl = `wss://${urlBase}`;
export let backendHttpUrl = `https://${urlBase}`;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  backendSocketUrl = `ws://localhost:5000/`;
  backendHttpUrl = `http://localhost:5000/`;
}

export type globalExtended = typeof globalThis & {
  multiplayerSocket: Socket | null;
};
