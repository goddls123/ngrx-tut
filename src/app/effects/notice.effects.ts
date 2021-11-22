import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ApiService } from '../service/api.service';
import {
  getEvents,
  getEventsSuccess,
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

  getNotice$ = createEffect(() => {
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

  //   @Effect()
  //   getNotice$ = this.actions$.pipe(
  //     ofType(getEvents),
  //     map(({ currentPage, itemPerPage }) => {
  //       return this.apiService.getEvents(currentPage, itemPerPage).pipe(
  //         map((data) => {
  //           if (data.status) {
  //             return this.store.dispatch(
  //               getEventsSuccess({ noticies: data.resp })
  //             );
  //           }
  //         })
  //       );
  //     })
  //   );
}
