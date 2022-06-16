import { Socket } from "socket.io-client";

export const backendSocketApi = "ws://localhost:5000/";

export type globalExtended = typeof globalThis & {
    multiplayerSocket: Socket;
  };