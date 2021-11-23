import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoticeState } from '../models/notice.model';

export const getNoticeState = createFeatureSelector<NoticeState>('noticeState');

export const getNotice = createSelector(
  getNoticeState,
  (state) => state.noticies
);

export const getComment = createSelector(
  getNoticeState,
  (state) => state.comments
);
