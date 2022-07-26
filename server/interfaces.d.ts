import { Gestures } from '../client/src/common/types';

interface IPlayingPlayers {
  playersMap: Map<string, string>;
  reversedPlayersMap: Map<string, string>;
  playersState: Map<string, IPlayersState>;
}

interface IWaitingPlayers {
  randomPlayers: string[];
  determinedPlayers: Map<string, string>; //<player name, socketid>
}

export interface IPlayers {
  playingPlayers: IPlayingPlayers;
  waitingPlayers: IWaitingPlayers;
}

export interface IPlayersState {
  move: Gestures;
  score: number;
}
