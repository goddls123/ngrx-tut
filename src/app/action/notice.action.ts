import { Type } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Comment, Notice } from '../models/notice.model';

export const addComment = createAction(
  '[Notice] add',
  props<{ comment: Comment }>()
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
  props<{ currentPage: number; itemPerPage: number; mainPage: string }>()
);

export const getEventsSuccess = createAction(
  '[Notice] get event success',
  props<{ noticies: Notice[] }>()
);

export const getNoticeSuccess = createAction(
  '[Notice] get event success',
  props<{ noticies: Notice[] }>()
);

export const getComments = createAction(
  '[Notice] get comment',
  props<{ noticeId: string; pageNum: number }>()
);
export const getCommentsSuccess = createAction(
  '[Notice] get comment success',
  props<{ comments: Comment[] }>()
);

export const moreComment = createAction(
  '[Notice] get more reply',
  props<{ index: number; more: boolean; comments: Comment[] }>()
);

export const noticeError = createAction('[Notice] http error');
