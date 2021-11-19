import { Todo } from '../models/todo.model';
import * as TodoActions from '../action/todo.actions';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AppState } from '../app.state';
import { getFilterName } from './filter.reducer';

const initialState: Todo[] = [];

const _todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state: Todo[], { todo }) => {
    return [...state, todo];
  }),
  on(TodoActions.removeTodo, (state: Todo[]) => {
    return state.filter((todo) => !todo.completed);
  }),
  on(TodoActions.toggleTodo, (state: Todo[], { index }) => {
    return state.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
  }),
  on(TodoActions.updateTodo, (state: Todo[], { name, index }) => {
    return state.map((todo, i) => (i === index ? { ...todo, name } : todo));
  })
);

export function todoReducer(state: Todo[], action: Action) {
  return _todoReducer(state, action);
}

const todoSelector = createFeatureSelector<AppState, Todo>('todoList');

export const getTodos = createSelector(
  todoSelector,
  getFilterName,
  (state, filter) => {
    return filterTodos(state, filter);
  }
);

const filterTodos = (todos, filter) => {
  const isCompleted = (todo) => todo.completed;
  if (filter === 'Active') {
    return todos.filter((todo) => !isCompleted(todo));
  }

  if (filter === 'Completed') {
    return todos.filter(isCompleted);
  }

  return todos;
};
