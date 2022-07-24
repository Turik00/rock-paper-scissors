import { determineStatus } from '../../../common/common-logic';
import { GameState } from '../../store/game-slice';
import { GameStatus } from '../../../common/types';

describe('GameArea component', () => {
  test('Determine victor logic test', () => {
    const state: GameState = {
      isMultiplayer: false,
      score: 0,
      status: GameStatus.opponentGestureSelected,
      playerGesture: 1,
      opponentGesture: 1,
    };

    expect(determineStatus(state)).toBe(GameStatus.tie);

    state.playerGesture = 0;
    state.opponentGesture = 0;
    expect(determineStatus(state)).toBe(GameStatus.tie);

    state.playerGesture = 0;
    state.opponentGesture = 2;
    expect(determineStatus(state)).toBe(GameStatus.win);

    state.playerGesture = 0;
    state.opponentGesture = 1;
    expect(determineStatus(state)).toBe(GameStatus.lose);


    state.playerGesture = 1;
    state.opponentGesture = 0;
    expect(determineStatus(state)).toBe(GameStatus.win);

    state.playerGesture = 1;
    state.opponentGesture = 2;
    expect(determineStatus(state)).toBe(GameStatus.lose);


  });
});
