import { IPlayers, IPlayersState } from '../interfaces';
import { GameStatus } from '../../client/src/common/types';
import { determineStatus } from '../../client/src/common/common-logic';

declare var global: typeof globalThis & {
  players: IPlayers;
};

export const initializePlayerState = () => {
  const playingPlayers = {
    playersMap: new Map<string, string>(),
    reversedPlayersMap: new Map<string, string>(),
    playersState: new Map<string, IPlayersState>(),
  };
  const waitingPlayers = {
    randomPlayers: [],
    determinedPlayers: new Map<string, string>,
  };
  global.players = { playingPlayers, waitingPlayers };
};

export const getWaitingDeterminedPlayersList = (): string[] => {
  return [...global.players.waitingPlayers.determinedPlayers.keys()];
}

export const addPlayerToDeterminedPlayersList = (playerName: string, playerSocketId: string): boolean => {
  if (global.players.waitingPlayers.determinedPlayers.has(playerName)) {
    console.log(`player ${playerName} already registered to the game`);
    return false;
  }
  //TODO: consider timeout for waitingPlayers for a game
  global.players.waitingPlayers.determinedPlayers.set(playerName, playerSocketId);
  console.log(`player ${playerName} registered successfully`);
  return true;
};

export const addPlayerToRandomPlayersList = (playerSocketId: string) => {
  //TODO: consider timeout for waitingPlayers for a game
  global.players.waitingPlayers.randomPlayers.push(playerSocketId);
};

export const playAgainstRandomPlayerAndReturnRandomPlayerId = (playerId: string): string | undefined => {
  const opponentPlayerId = global.players.waitingPlayers.randomPlayers.shift();
  if (opponentPlayerId == null) {
    console.log(`currntly no waitingPlayers hence adding player ${playerId} to waitingPlayers`);
    addPlayerToRandomPlayersList(playerId);
    return;
  }
  startNewGame(playerId, opponentPlayerId);
  return opponentPlayerId;
};

export const playAgainstDeterminedPlayerAndReturnOpponentPlayerId = (playerId: string, opponentPlayerName: string): string | undefined => {
  const opponentPlayerId = global.players.waitingPlayers.determinedPlayers.get(opponentPlayerName);
  if (opponentPlayerId == null) {
    console.error(`There is no such player as playerName: ${opponentPlayerName}`);
    return;
  }
  startNewGame(playerId, opponentPlayerId);
  return opponentPlayerId;
};

export const startNewGame = (playerId: string, opponentPlayerId: string) => {
  global.players.playingPlayers.playersMap.set(playerId, opponentPlayerId);
  global.players.playingPlayers.playersMap.set(opponentPlayerId, playerId);
  global.players.playingPlayers.playersState.set(playerId, { move: -1, score: 0 });
  global.players.playingPlayers.playersState.set(opponentPlayerId, { move: -1, score: 0 });
};

export const preparePlayersForNextRound = (playerId: string, opponentPlayerId: string) => {
  global.players.playingPlayers.playersState.set(playerId, { move: -1, score: getPlayerState(playerId).score });
  global.players.playingPlayers.playersState.set(opponentPlayerId, { move: -1, score: getPlayerState(opponentPlayerId).score });
};

export const executeMove = (playerId: string, move: number): string | undefined => {
  const playerstate = global.players.playingPlayers.playersState.get(playerId);
  if (playerstate == null) {
    // TODO: handle error case. maybe disconnect.
    return;
  }
  global.players.playingPlayers.playersState.set(playerId, { ...playerstate, move: move });

  let opponentPlayerId = undefined;
  if (global.players.playingPlayers.playersMap.has(playerId)) {
    opponentPlayerId = global.players.playingPlayers.playersMap.get(playerId);
  } else {
    opponentPlayerId = global.players.playingPlayers.reversedPlayersMap.get(playerId);
  }
  if (opponentPlayerId == null) {
    // TODO: error opponet does not exist - maybe stop game
    return;
  }
  const opponentPlayerMove = global.players.playingPlayers.playersState.get(opponentPlayerId)?.move;
  if (opponentPlayerMove == null || opponentPlayerMove === -1) {
    console.log(`opponentPlayerId ${opponentPlayerId} has not move yet`);
    return;
  }
  updateGameState(playerId, opponentPlayerId);
  return opponentPlayerId;
};

export const getPlayerState = (playerId: string): IPlayersState => {
  return global.players.playingPlayers.playersState.get(playerId)!;
};

export const playerDisconnect = (playerId: string): string | undefined => {
  global.players.waitingPlayers.randomPlayers = global.players.waitingPlayers.randomPlayers.filter((player) => player !== playerId);
  
  const determinedPlayersToRemove: string[] = [];
  for (const [playerName, playerSocketId] of global.players.waitingPlayers.determinedPlayers) {
    if (playerSocketId === playerId) {
      determinedPlayersToRemove.push(playerName);
    } 
  }
  determinedPlayersToRemove.forEach(playerName => global.players.waitingPlayers.determinedPlayers.delete(playerName));

  global.players.playingPlayers.playersState.delete(playerId);
  let opponentPlayerId = undefined;

  if (global.players.playingPlayers.playersMap.has(playerId)) {
    opponentPlayerId = global.players.playingPlayers.playersMap.get(playerId);
    global.players.playingPlayers.playersMap.delete(playerId);
    if (opponentPlayerId != null) {
      global.players.playingPlayers.reversedPlayersMap.delete(opponentPlayerId);
    }
  } else {
    opponentPlayerId = global.players.playingPlayers.reversedPlayersMap.get(playerId);
    global.players.playingPlayers.reversedPlayersMap.delete(playerId);
    if (opponentPlayerId != null) {
      global.players.playingPlayers.playersMap.delete(opponentPlayerId);
    }
  }
  if (opponentPlayerId != null) {
    global.players.playingPlayers.playersState.delete(opponentPlayerId);
  }

  return opponentPlayerId;
};

const updateGameState = (playerId: string, opponentPlayerId: string) => {
  const playersState = global.players.playingPlayers.playersState.get(playerId);
  const opponentState = global.players.playingPlayers.playersState.get(opponentPlayerId);

  const setPlayerWinState = () => {
    global.players.playingPlayers.playersState.set(playerId, { ...playersState!, score: ++playersState!.score });
    global.players.playingPlayers.playersState.set(opponentPlayerId, { ...opponentState!, score: --opponentState!.score });
  };

  const setOpponentWinState = () => {
    global.players.playingPlayers.playersState.set(playerId, { ...playersState!, score: --playersState!.score });
    global.players.playingPlayers.playersState.set(opponentPlayerId, { ...opponentState!, score: ++opponentState!.score });
  };

  const gameStatus = determineStatus({
    playerGesture: playersState?.move,
    opponentGesture: opponentState?.move,
    score: -1, // not relevant for this method
    isMultiplayer: false, // not relevant for this method
    status: GameStatus.tie // not relevant for this method
  });

  switch (gameStatus) {
    case GameStatus.win:
      setPlayerWinState();
      return;
    case GameStatus.lose:
      setOpponentWinState();
      return;
    default:
      return;
  }
};
