/*
 *  Copyright (c) 2020 Smartworks.net, Inc. & AIROV Tech. All Rights Reserved
 *
 *  Use of this software is controlled by the terms and conditions found in the
 *  license agreement under which this software has been supplied.
 *------------------------------------------------------------------------------
 *
 *  Source Name:   	pagination.directive.ts
 *  Description:    Custom pagination directive 스크립트
 *  Authors:        J.H. Lee
 *  Update History:
 *                  2021.07.15 : Created by J.H. Lee
 *
 */

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'arv-pagination',
  templateUrl: './pagination.directive.html',
  styleUrls: ['./pagination.directive.css'],
})
export class PaginationDirective implements OnInit {
  private _currentPage: number;
  @Input() totalPage: Array<number>;
  @Output() currentPageChange: EventEmitter<number> =
    new EventEmitter<number>();
  action: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  get currentPage() {
    return this._currentPage;
  }

  @Input('currentPage')
  set currentPage(val: number) {
    if (val) {
      this._currentPage = val;
    } else {
      this._currentPage = 1;
      this.currentPageChange.emit(1);
    }
  }

  selectPage(page: number) {
    if (page === this.currentPage) return;

    this.currentPage = page;
    this.currentPageChange.emit(this.currentPage);
  }
  onNextPage() {
    if (this.currentPage < this.totalPage.length) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }
}
