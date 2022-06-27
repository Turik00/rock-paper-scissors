export enum Gestures {
    noMove = -1,
    rock = 0,
    paper,
    scissors,
};

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