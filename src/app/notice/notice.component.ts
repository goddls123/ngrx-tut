import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from '../models/notice.model';
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
  noticies: Array<Notice>;
  selectedNotice: Notice;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.mainPage = params['mainPage'];
        this.subPage = params['subPage'];

        if (this.subPage === 'list') {
          this.currentPage = 1;
        } else if (this.subPage === 'detail') {
          this.selectedNotice = JSON.parse(params.notice);
        }
      })
    );
  }

  // todoList 호출하는 알고리즘 개선

  set subPage(val) {
    if (val) {
      this._subPage = val;
      if (val == 'list') {
        this.currentPage = this.currentPage ?? 1;
      }
    }
  }
  get subPage(): string {
    return this._subPage;
  }

  set currentPage(val) {
    if (val) {
      if (this.mainPage === 'event') {
        this.apiService
          .getEvents(val - 1, this.itemsPerPage)
          .then((resp: any) => {
            if (resp.status) {
              this.noticies = resp.result;
              this.totalItems = this.noticies[0]?.total ?? 0;
              this.totalPage = Array(
                Math.ceil(this.totalItems / this.itemsPerPage)
              )
                .fill(1)
                .map((x, i) => i + 1);
              this._currentPage = val;
            } else {
            }
          });
      } else if (this.mainPage === 'billiai-info') {
        this.apiService
          .getBilliaiInfos(val - 1, this.itemsPerPage)
          .then((resp: any) => {
            if (resp.status) {
              this.noticies = resp.result;
              this.totalItems = this.noticies[0]?.total ?? 0;
              this.totalPage = Array(
                Math.ceil(this.totalItems / this.itemsPerPage)
              )
                .fill(1)
                .map((x, i) => i + 1);
              this._currentPage = val;
            } else {
            }
          });
      } else if (this.mainPage === 'billiard-info') {
        this.apiService
          .getBilliardInfos(val - 1, this.itemsPerPage)
          .then((resp: any) => {
            if (resp.status) {
              this.noticies = resp.result;
              this.totalItems = this.noticies[0]?.total ?? 0;
              this.totalPage = Array(
                Math.ceil(this.totalItems / this.itemsPerPage)
              )
                .fill(1)
                .map((x, i) => i + 1);
              this._currentPage = val;
            } else {
            }
          });
      }
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
