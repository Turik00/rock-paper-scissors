export enum Gestures {
    noMove = -1,
    rock = 0,
    paper,
    scissors,
};

export const GesturesNumber = 3;

export enum GameStatus {
    pendingGameModeSelection = -2,
    pendingOpponentToJoin = -1,
    pendingPlayerGesture = 0,
    playerGestureSelected,
    opponentGestureSelected,
    win,
    lose,
    tie,
};

export interface GameState {
    score: number;
    status: GameStatus;
    playerGesture?: Gestures;
    opponentGesture?: Gestures;
    isMultiplayer: boolean;
    multiplayerOpponentId?: string;
  }