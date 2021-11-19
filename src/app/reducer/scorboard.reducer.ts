import { createReducer, on } from '@ngrx/store';
import { Game } from '../models/todo.model';
import * as ScoreboardPageActions from '../action/scorboard.action';

export const initialState: Game = {
  home: 0,
  away: 0,
};

export const scoreboardReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, (state) => ({
    ...state,
    home: state.home + 1,
  })),
  on(ScoreboardPageActions.awayScore, (state) => ({
    ...state,
    away: state.away + 1,
  })),
  on(ScoreboardPageActions.resetScore, (state) => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({
    home: game.home,
    away: game.away,
  }))
);
