import { createAction, props } from '@ngrx/store';

export const changeFilter = createAction(
  '[Filter] change',
  props<{ name: string }>()
);
