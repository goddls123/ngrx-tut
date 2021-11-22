import { Type } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Notice } from '../models/notice.model';

export const addNotice = createAction(
  '[Notice] add',
  props<{ notice: Notice }>()
);
export const deleteNotice = createAction(
  '[Notice] delete',
  props<{ notice: Notice }>()
);
export const setNotice = createAction(
  '[Notice] set',
  props<{ notice: Notice }>()
);
export const getEvents = createAction(
  '[Notice] get event',
  props<{ currentPage: number; itemPerPage: number }>()
);

export const getNotices = createAction(
  '[Notice] get notice',
  props<{ currentPage: number; itemPerPage: number; category: string }>()
);

export const getEventsSuccess = createAction(
  '[Notice] get event success',
  props<{ noticies: Notice[] }>()
);

export const noticeError = createAction('[Notice] http error');
