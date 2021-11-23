import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ApiService } from '../service/api.service';
import {
  getComments,
  getCommentsSuccess,
  getEvents,
  getEventsSuccess,
  getNotices,
  getNoticeSuccess,
  noticeError,
} from '../action/notice.action';
import { catchError, EMPTY, map, mergeMap, of, switchMap } from 'rxjs';
import { Notice } from '../models/notice.model';
import { getTodos } from '../reducer/todo.reducer';

@Injectable()
export class NoticeEffects {
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private store: Store
  ) {}

  getEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getEvents),
      mergeMap(({ currentPage, itemPerPage }) => {
        return this.apiService.getEvents(currentPage, itemPerPage).pipe(
          map((data) => {
            console.log(data.result);
            const noticies = data.result;
            if (data.status) {
              return getEventsSuccess({ noticies });
            }
          })
          //   catchError(() => EMPTY)
        );
      })
    );
  });

  getComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getComments),
      mergeMap(({ noticeId, pageNum }) => {
        return this.apiService.getComments(noticeId, pageNum).pipe(
          map((data) => {
            const comments = data.result;
            if (data.status) {
              return getCommentsSuccess({ comments });
            }
          })
          //   catchError(() => EMPTY)
        );
      })
    );
  });
  getNotice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNotices),
      mergeMap(({ currentPage, itemPerPage, mainPage }) => {
        if (mainPage === 'event') {
          return this.apiService.getEvents(currentPage, itemPerPage).pipe(
            map((data) => {
              console.log(data.result);
              const noticies = data.result;
              if (data.status) {
                return getNoticeSuccess({ noticies });
              }
            })
            //   catchError(() => EMPTY)
          );
        } else if (mainPage === 'billiai-info') {
          return this.apiService.getBilliaiInfos(currentPage, itemPerPage).pipe(
            map((data) => {
              console.log(data.result);
              const noticies = data.result;
              if (data.status) {
                return getNoticeSuccess({ noticies });
              }
            })
            //   catchError(() => EMPTY)
          );
        } else if (mainPage === 'billiard-info') {
          return this.apiService
            .getBilliardInfos(currentPage, itemPerPage)
            .pipe(
              map((data) => {
                console.log(data.result);
                const noticies = data.result;
                if (data.status) {
                  return getNoticeSuccess({ noticies });
                }
              })
              //   catchError(() => EMPTY)
            );
        }
      })
    );
  });
}
