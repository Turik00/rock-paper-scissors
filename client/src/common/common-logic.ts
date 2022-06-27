import { GameState } from '../app/store/game-slice';
import { GameStatus, Gestures } from './types';

export const determineStatus = (state: GameState) => {
  if (state.playerGesture === Gestures.paper) {
    if (state.opponentGesture === Gestures.paper) {
      return GameStatus.tie;
    }
    if (state.opponentGesture === Gestures.rock) {
      return GameStatus.win;
    }
    if (state.opponentGesture === Gestures.scissors) {
      return GameStatus.lose;
    }
  }
  if (state.playerGesture === Gestures.rock) {
    if (state.opponentGesture === Gestures.paper) {
      return GameStatus.lose;
    }
    if (state.opponentGesture === Gestures.rock) {
      return GameStatus.tie;
    }
    if (state.opponentGesture === Gestures.scissors) {
      return GameStatus.win;
    }
  }
  if (state.playerGesture === Gestures.scissors) {
    if (state.opponentGesture === Gestures.paper) {
      return GameStatus.win;
    }
    if (state.opponentGesture === Gestures.rock) {
      return GameStatus.lose;
    }
    if (state.opponentGesture === Gestures.scissors) {
      return GameStatus.tie;
    }
  }
};
