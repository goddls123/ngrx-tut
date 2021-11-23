import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEvents, getNotices } from '../action/notice.action';
import { AppState } from '../app.state';
import { Notice } from '../models/notice.model';
import { getNotice } from '../selector/notice.selector';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'user-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  mainPage: string;
  itemsPerPage: number = 10;
  _currentPage: number;
  totalPage: Array<number>;
  _subPage: string;
  totalItems: number;
  subscriptions: Array<any> = [];
  noticies: Array<any>;
  // noticies: Observable<any>;
  selectedNotice: Notice;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.mainPage = params['mainPage'];
        this.subPage = params['subPage'];

        if (this.subPage === 'detail') {
          this.selectedNotice = JSON.parse(params.notice);
        }
      })
    );
    this.subscriptions.push(
      this.store.select(getNotice).subscribe((data) => {
        this.noticies = data;
        this.totalItems = this.noticies[0]?.total ?? 0;
        console.log(this.totalItems);
        this.totalPage = Array(Math.ceil(this.totalItems / this.itemsPerPage))
          .fill(1)
          .map((x, i) => i + 1);
      })
    );
  }

  // todoList 호출하는 알고리즘 개선

  set subPage(val) {
    if (val) {
      this._subPage = val;
      if (val === 'list') {
        this.currentPage = this.currentPage ?? 1;
      }
    }
  }
  get subPage(): string {
    return this._subPage;
  }

  set currentPage(val) {
    if (val) {
      this.store.dispatch(
        getNotices({
          currentPage: val - 1,
          itemPerPage: this.itemsPerPage,
          mainPage: this.mainPage,
        })
      );
      this._currentPage = val;
    }
  }
  getNoticeList(curentPage: number) {}
  get currentPage() {
    return this._currentPage;
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  createNotice() {
    const notice = new Notice();
    this.router.navigate([
      `notice/${this.mainPage}/edit`,
      { notice: JSON.stringify(notice) },
    ]);
  }

  gotoDetail(notice: Notice) {
    this.router.navigate([
      `notice/${this.mainPage}/detail`,
      { notice: JSON.stringify(notice) },
    ]);
  }
}
