import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

export enum Gestures {
  rock = 0,
  paper,
  scissors,
}

export enum GameStatus {
  pendingPlayerGesture,
  playerGestureSelected,
  opponentGestureSelected,
  win,
  lose,
  tie,
}

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
  status: GameStatus.pendingPlayerGesture,
  isMultiplayer: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectGesture: (state: GameState, action: PayloadAction<Gestures>) => {
      state.playerGesture = action.payload;
      state.status = GameStatus.playerGestureSelected;
    },
    playAgain: (state: GameState) => {
      state.status = GameStatus.pendingPlayerGesture;
      state.opponentGesture = undefined;
      state.playerGesture = undefined;
    },

    selectOpponentGesture: (state: GameState, action: PayloadAction<Gestures>) => {
      state.opponentGesture = action.payload;
      state.status = GameStatus.opponentGestureSelected;
      const status = determineStatus(state);
      switch (status) {
        case GameStatus.lose:
          state.status = GameStatus.lose;
          state.score--;
          return;
        case GameStatus.win:
          state.status = GameStatus.win;
          state.score++;
          return;
        default:
          state.status = GameStatus.tie;
          return;
      }
    },
  },
});

export const { selectGesture, playAgain, selectOpponentGesture } = gameSlice.actions;
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
    //TODO: when multipleyer should... retrieve move from server
    opponentGesture = await new Promise<Gestures>((resolve, reject) => {
      resolve(Gestures.paper);
    });
  } else {
    opponentGesture = Math.floor(Math.random() * 3);
  }
  dispatch(selectOpponentGesture(opponentGesture));
};

const determineStatus = (state: GameState) => {
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
