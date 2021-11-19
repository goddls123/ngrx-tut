import { Action, createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const changeStaticFile = createAction(
  '[Static Data] File Update',
  props<{ file: number }>()
);

export const addTodo = createAction('[Todo] Add', props<{ todo: Todo }>());
export const removeTodo = createAction('[Todo] Remove');
export const toggleTodo = createAction(
  '[Todo] Toggle',
  props<{ index: number }>()
);
export const updateTodo = createAction(
  '[Todo] Update',
  props<{ name: string; index: number }>()
);
