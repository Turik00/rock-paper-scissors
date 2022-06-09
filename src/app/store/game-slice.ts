import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum Gestures {
  rock = 0,
  paper,
  scissors,
}

export enum GameStatus {
  pendingPlayerGesture,
  playerGestureSelected,
  win,
  lose,
}

export interface GameState {
  score: number;
  status: GameStatus;
  lastPlayerGesture?: Gestures;
  lastOpponentGesture?: Gestures;
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
        state.lastPlayerGesture = action.payload;
        state.status = GameStatus.playerGestureSelected;
    },
    playAgain: (state: GameState) => {
        state.status = GameStatus.pendingPlayerGesture;
        state.lastOpponentGesture = undefined;
        state.lastPlayerGesture = undefined;
    },
    updateScore: (state: GameState, action: PayloadAction<GameStatus>) => {
        if (action.payload === GameStatus.win) {
            state.score++;
            return;
        }
        state.score--;
    },
  },
});

export const { selectGesture, playAgain } = gameSlice.actions;
export const selectGameState = (state: RootState) => state.game;
export default gameSlice.reducer;
