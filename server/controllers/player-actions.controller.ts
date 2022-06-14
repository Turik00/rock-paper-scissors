import { Gestures, globalObject, IPlayersState } from '../utils';

export const initializePlayerState = () => {
  const playingPlayers = {
    playersMap: new Map<string, string>(),
    reversedPlayersMap: new Map<string, string>(),
    playersState: new Map<string, IPlayersState>(),
  };
  const waitingPlayers = {
    randomPlayers: [],
    determinedPlayers: [],
  };
  globalObject().players = { playingPlayers, waitingPlayers };
};

export const addPlayerToRandomPlayersList = (playerSocketId: string) => {
  //TODO: consider timeout for waitingPlayers for a game
  globalObject().players.waitingPlayers.randomPlayers.push(playerSocketId);
};

export const playAgainstRandomPlayerAndReturnRandomPlayerId = (playerId: string): string | undefined => {
  const opponentPlayerId = globalObject().players.waitingPlayers.randomPlayers.shift();
  if (opponentPlayerId == null) {
    console.log(`currntly no waitingPlayers hence adding player ${playerId} to waitingPlayers`);
    addPlayerToRandomPlayersList(playerId);
    return;
  }
  globalObject().players.playingPlayers.playersMap.set(playerId, opponentPlayerId);
  globalObject().players.playingPlayers.playersMap.set(opponentPlayerId, playerId);
  startNewGame(playerId, opponentPlayerId);
  return opponentPlayerId;
};

export const startNewGame = (playerId: string, opponentPlayerId: string) => {
  globalObject().players.playingPlayers.playersState.set(playerId, { move: -1, score: 0 });
  globalObject().players.playingPlayers.playersState.set(opponentPlayerId, { move: -1, score: 0 });
};

export const executeMove = (playerId: string, move: number): string | undefined => {
  const playerstate = globalObject().players.playingPlayers.playersState.get(playerId);
  if (playerstate == null) {
    // TODO: handle error case. maybe disconnect.
    return;
  }
  globalObject().players.playingPlayers.playersState.set(playerId, { ...playerstate, move: move });

  let opponentPlayerId = undefined;
  if (globalObject().players.playingPlayers.playersMap.has(playerId)) {
    opponentPlayerId = globalObject().players.playingPlayers.playersMap.get(playerId);
  } else {
    opponentPlayerId = globalObject().players.playingPlayers.reversedPlayersMap.get(playerId);
  }
  if (opponentPlayerId == null) {
    // TODO: error opponet does not exist - maybe stop game
    return;
  }
  const opponentPlayerMove = globalObject().players.playingPlayers.playersState.get(opponentPlayerId)?.move;
  if (opponentPlayerMove == null || opponentPlayerMove === -1) {
    console.log(`opponentPlayerId ${opponentPlayerId} has not move yet`);
    return;
  }
  updateGameState(playerId, opponentPlayerId);
  return opponentPlayerId;
};

export const getPlayerState = (playerId: string): IPlayersState => {
  return globalObject().players.playingPlayers.playersState.get(playerId)!;
};

export const playerDisconnect = (playerId: string): string | undefined => {
  globalObject().players.waitingPlayers.randomPlayers = globalObject().players.waitingPlayers.randomPlayers.filter(
    (player) => player !== playerId
  );
  globalObject().players.waitingPlayers.determinedPlayers = globalObject().players.waitingPlayers.determinedPlayers.filter(
    (player) => player !== playerId
  );

  let opponentPlayerId = undefined;

  if (globalObject().players.playingPlayers.playersMap.has(playerId)) {
    opponentPlayerId = globalObject().players.playingPlayers.playersMap.get(playerId);
    globalObject().players.playingPlayers.playersMap.delete(playerId);
  } else {
    opponentPlayerId = globalObject().players.playingPlayers.reversedPlayersMap.get(playerId);
    if (opponentPlayerId != null) {
      globalObject().players.playingPlayers.playersMap.delete(opponentPlayerId);
    }
  }
  return opponentPlayerId;
};

const updateGameState = (playerId: string, opponentPlayerId: string) => {
  const playersState = globalObject().players.playingPlayers.playersState.get(playerId);
  const opponentState = globalObject().players.playingPlayers.playersState.get(opponentPlayerId);

  const setPlayerWinState = () => {
    globalObject().players.playingPlayers.playersState.set(playerId, { ...playersState!, score: ++playersState!.score });
    globalObject().players.playingPlayers.playersState.set(opponentPlayerId, { ...opponentState!, score: --opponentState!.score });
  };

  const setOpponentWinState = () => {
    globalObject().players.playingPlayers.playersState.set(playerId, { ...playersState!, score: --playersState!.score });
    globalObject().players.playingPlayers.playersState.set(opponentPlayerId, { ...opponentState!, score: ++opponentState!.score });
  };

  // TODO: consolidate with client victory state
  if (playersState?.move === Gestures.paper) {
    if (opponentState?.move === Gestures.paper) {
      return;
    }
    if (opponentState?.move === Gestures.rock) {
      setPlayerWinState();
      return;
    }
    if (opponentState?.move === Gestures.scissors) {
      setOpponentWinState();
      return;
    }
  }
  if (playersState?.move === Gestures.rock) {
    if (opponentState?.move === Gestures.paper) {
      setOpponentWinState();
      return;
    }
    if (opponentState?.move === Gestures.rock) {
      return;
    }
    if (opponentState?.move === Gestures.scissors) {
      setPlayerWinState();
      return;
    }
  }
  if (playersState?.move === Gestures.scissors) {
    if (opponentState?.move === Gestures.paper) {
      setPlayerWinState();
      return;
    }
    if (opponentState?.move === Gestures.rock) {
      setOpponentWinState();
      return;
    }
    if (opponentState?.move === Gestures.scissors) {
      return;
    }
  }
};
