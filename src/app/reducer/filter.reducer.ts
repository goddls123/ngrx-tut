import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { changeFilter } from '../action/filter.action';
import { AppState } from '../app.state';
import { Filter } from '../models/todo.model';

const initialState: Filter = { name: 'All' };

export const _filterReducer = createReducer(
  initialState,
  on(changeFilter, (state, { name }) => {
    return { name };
  })
);

export const getFilterState = createFeatureSelector<Filter>('filter');

export function filterReducer(state: Filter, action: Action) {
  return _filterReducer(state, action);
}

export const getFilterName = createSelector(
  getFilterState,
  (state) => state.name
);
