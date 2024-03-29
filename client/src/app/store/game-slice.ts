import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { GameState, GameStatus, Gestures, GesturesNumber } from '../../common/types';
import { determineStatus } from '../../common/common-logic';

const initialState: GameState = {
  score: 0,
  status: GameStatus.pendingGameModeSelection,
  isMultiplayer: false,
};

const gameSlice = createSlice({

  name: 'game',
  initialState,
  reducers: {
    selectGesture: (state, action: PayloadAction<Gestures>) => {
      state.playerGesture = action.payload;
      state.status = GameStatus.playerGestureSelected;
    },

    playAgain: (state) => {
      state.status = GameStatus.pendingPlayerGesture;
      state.opponentGesture = undefined;
      state.playerGesture = undefined;
    },

    selectOpponentGesture: (state, action: PayloadAction<Gestures>) => {
      state.opponentGesture = action.payload;
      state.status = GameStatus.opponentGestureSelected;
      const status = determineStatus(state as GameState);
      switch (status) {
        case GameStatus.lose:
          state.status = GameStatus.lose;
          if (state.isMultiplayer) {
            return;
          }
          state.score--;
          return;
        case GameStatus.win:
          state.status = GameStatus.win;
          if (state.isMultiplayer) {
            return;
          }
          state.score++;
          return;
        default:
          state.status = GameStatus.tie;
          return;
      }
    },

    selectSinglePlayer: (state) => {
      state.status = GameStatus.pendingPlayerGesture;
      state.isMultiplayer = false;
      resetSharedState(state);
    },

    selectMultiPlayer: (state) => {
      state.status = GameStatus.pendingOpponentToJoin;
      state.isMultiplayer = true;
      state.score = 0;
    },

    setMultiplayerGameStarted: (state) => {
      state.status = GameStatus.pendingPlayerGesture;
    },

    updateScore: (state, action: PayloadAction<number>) => {
      if (!state.isMultiplayer) {
        return;
      }
      state.score = action.payload;
    },
    opponentPlayerDisconnected: (state) => {
      state.status = GameStatus.pendingGameModeSelection;
    },
  },
});

export const {
  selectGesture,
  playAgain,
  selectOpponentGesture,
  selectSinglePlayer,
  selectMultiPlayer,
  setMultiplayerGameStarted,
  updateScore: updateScoreForMultiplayer,
  opponentPlayerDisconnected,
} = gameSlice.actions;
export const selectGameState = (state: RootState) => state.game;
export default gameSlice.reducer;

export const retrieveOpponentGesture = (): AppThunk => async (dispatch, getState) => {
  const gameState = selectGameState(getState());
  if (gameState.status !== GameStatus.playerGestureSelected) {
    console.error(`Reached this point with wrong state. Expected: playerGestureSelected, actual: ${GameStatus[gameState.status]}`);
    return;
  }
  let opponentGesture = Gestures.rock;
  if (gameState.isMultiplayer) {
    return;
  } else {
    opponentGesture = Math.floor(Math.random() * GesturesNumber);
  }
  dispatch(selectOpponentGesture(opponentGesture));
};

function resetSharedState(state: GameState) {
  state.score = 0;
  state.playerGesture = undefined;
  state.opponentGesture = undefined;
  state.multiplayerOpponentId = undefined;
}
