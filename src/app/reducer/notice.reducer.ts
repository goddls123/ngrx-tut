import { Action, createReducer, on } from '@ngrx/store';
import { Notice, NoticeState } from '../models/notice.model';
import * as NoticeActions from '../action/notice.action';

const initialState: NoticeState = { noticies: [], comments: [] };

const _noticeReducer = createReducer(
  initialState,
  on(NoticeActions.getNoticeSuccess, (state, { noticies }) => {
    return { ...state, noticies };
  }),
  on(NoticeActions.getCommentsSuccess, (state, { comments }) => {
    return { ...state, comments };
  }),
  on(NoticeActions.moreComment, (state, { index, more, comments }) => {
    state.comments[index].replyList = comments;
    state.comments[index].more = more;
    return state;
  })
);

export function noticeReducer(state: NoticeState, action: Action) {
  return _noticeReducer(state, action);
}
