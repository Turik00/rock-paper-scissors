import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalExtended } from '../consts/consts';
import { AppThunk, RootState } from './store';
import { GameStatus, Gestures } from '../../common/types';
import { determineStatus } from '../../common/common-logic';

declare var window: Window & globalExtended;

export interface GameState {
  score: number;
  status: GameStatus;
  playerGesture?: Gestures;
  opponentGesture?: Gestures;
  isMultiplayer: boolean;
  multiplayerOpponentId?: string;
}

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

    updateScoreForMultiplayer: (state, action: PayloadAction<number>) => {
      if (!state.isMultiplayer) {
        return;
      }
      state.score = action.payload;
    },
    opponentPlayerDisconnected: (state) => {
      state.status = GameStatus.pendingGameModeSelection;
      window?.multiplayerSocket?.disconnect();
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
  updateScoreForMultiplayer,
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
    opponentGesture = Math.floor(Math.random() * 3);
  }
  dispatch(selectOpponentGesture(opponentGesture));
};

export const startMultiplayerGame = (): AppThunk => async (dispatch, getState) => {
  window.multiplayerSocket?.on('playerStateUpdate', (payload: { opponentMove: Gestures; playerScore: number }) => {
    dispatch(selectOpponentGesture(payload.opponentMove));
    dispatch(updateScoreForMultiplayer(payload.playerScore));
  });
  dispatch(setMultiplayerGameStarted());
};

function resetSharedState(state: GameState) {
  state.score = 0;
  state.playerGesture = undefined;
  state.opponentGesture = undefined;
  state.multiplayerOpponentId = undefined;
}

