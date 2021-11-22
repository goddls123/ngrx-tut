import { Action, createReducer, on } from '@ngrx/store';
import { Notice, NoticeState } from '../models/notice.model';
import * as NoticeActions from '../action/notice.action';

const initialState: Notice[] = [];

const _noticeReducer = createReducer(
  initialState,
  on(NoticeActions.getEventsSuccess, (state, { noticies }) => {
    return noticies;
  })
);

export function noticeReducer(state: Notice[], action: Action) {
  return _noticeReducer(state, action);
}
