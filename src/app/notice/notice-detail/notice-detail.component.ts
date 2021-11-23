/*
 *  Copyright (c) 2020 Smartworks.net, Inc. & AIROV Tech. All Rights Reserved
 *
 *  Use of this software is controlled by the terms and conditions found in the
 *  license agreement under which this software has been supplied.
 *------------------------------------------------------------------------------
 *
 *  Source Name:   	notice-detail.component.ts
 *  Description:    비전클라우드 user notice detail 화면의 스크립트
 *  Authors:        J.H. Lee
 *  Update History:
 *                  2021.07.15 : Created by J.h. Lee
 *
 */

import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getComments, moreComment } from 'src/app/action/notice.action';
import { Notice, Comment, NoticeState } from 'src/app/models/notice.model';
import { getComment } from 'src/app/selector/notice.selector';

import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'user-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css'],
})
export class NoticeDetailComponent implements OnInit {
  myComment: string;
  myReply: string;
  commentList: Array<Comment> = [];
  editingComment: string;
  currentReply: number = -1;
  currentComment: number = -1;
  subscriptions: Array<any> = [];
  @Input() notice: Notice;
  @Input() mainPage: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private store: Store<NoticeState>
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.autoMore, true);
    window.addEventListener('scroll', this.autoMore, true);
    this.detailSetting();
    this.updateViewCount();
    // this.refreshComment();
    this.store.dispatch(getComments({ noticeId: this.notice.id, pageNum: 0 }));
    this.store.select(getComment).subscribe((data) => {
      this.commentList = data;
      this.notice.comment = this.commentList[0]?.commentCount ?? 0;
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.autoMore, true);
    window.removeEventListener('scroll', this.autoMore, true);
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  detailSetting() {
    const iframe = document.querySelector('iframe');
    iframe.contentWindow.document.body.innerHTML = this.notice.contents;
    iframe.height =
      iframe.contentWindow.document.scrollingElement.scrollHeight + 'px';
  }

  movePage(page: string) {
    if (page === 'list') {
      this.router.navigate([`notice/${this.mainPage}/${page}`]);
    } else {
      this.router.navigate([
        `notice/${this.mainPage}/${page}`,
        { notice: this.notice },
      ]);
    }
  }

  autoMore = () => {};

  async updateViewCount() {
    let resp: any;

    if (this.mainPage === 'event') {
      resp = await this.apiService.updateEventViewCount(this.notice.id);
    } else if (this.mainPage === 'billiai-info') {
      resp = await this.apiService.updateBilliaiInfoViewCount(this.notice.id);
    } else if (this.mainPage === 'billiard-info') {
      resp = await this.apiService.updateBilliardInfoViewCount(this.notice.id);
    }
    if (resp.status) {
      this.notice.viewCount++;
    } else {
    }
  }

  // todo List async 바꾸기 try catch 로 바꿔야함, catch error 아직 못함
  /******** 댓글  ********/
  async refreshComment() {
    const resp: any = await this.apiService.getComments(this.notice.id);

    if (resp.status) {
      this.commentList = resp.result;
      this.notice.comment = this.commentList[0]?.commentCount ?? 0;
    } else {
    }
  }

  async registerComment() {
    const comment = new Comment(
      null,
      this.myComment,
      this.notice.id,
      this.notice.id
    );

    const resp: any = await this.apiService.setComment(comment);

    if (resp.status) {
      this.myComment = '';
      this.refreshComment();
    } else {
      console.log('error');
    }
  }
  async updateComment(id: string, parentId: string, contents: string) {
    if (!id) {
      return;
    }

    const comment = new Comment(id, contents, parentId, this.notice.id);
    const resp: any = await this.apiService.setComment(comment);

    if (resp.status) {
      this.myReply = null;
      this.currentReply = -1;
      this.currentComment = -1;
      this.refreshComment();
    } else {
    }
  }

  async deleteComment(comment: Comment) {
    if (!comment) {
      return;
    }
    const resp: any = await this.apiService.deleteComment(comment);

    if (resp.status) {
      this.refreshComment();
    } else {
    }
  }

  /******** 답글  ********/

  async moreReply(commentId: string, commentIndex: number) {
    const resp: any = await this.apiService.getReplies(commentId);

    if (resp.status) {
      // this.commentList[commentIndex].replyList = resp.result;
      // this.commentList[commentIndex].more = true;
      this.store.dispatch(
        moreComment({ index: commentIndex, more: true, comments: resp.result })
      );
    } else {
    }
  }

  async registerReply(id: string, commentIndex: number) {
    if (!id && !commentIndex) {
      return;
    }

    const reply = new Comment(null, this.myReply, id, this.notice.id);
    const resp: any = await this.apiService.setComment(reply);

    if (resp.status) {
      this.myReply = null;
      this.currentComment = -1;
      this.currentReply = -1;
      this.refreshReply(id, commentIndex);
    } else {
    }
  }

  async refreshReply(id: string, commentIndex: number) {
    if (!id && !commentIndex) {
      return;
    }
    const resp: any = await this.apiService.getReplies(id);

    if (resp.status) {
      this.commentList[commentIndex].replyList = resp.result;
      this.commentList[commentIndex].replyCount =
        this.commentList[commentIndex].replyList.length;
    } else {
    }
  }

  closeReply(commentIndex: number) {
    this.commentList[commentIndex].more = false;
    this.commentList[commentIndex].replyList = [];
  }

  async deleteNotice(notice: Notice) {
    if (!notice) {
      return;
    }
    let resp: any;

    if (this.mainPage === 'event') {
      resp = await this.apiService.deleteEvent(notice);
    } else if (this.mainPage === 'billiai-info') {
      resp = await this.apiService.deleteBilliaiInfo(notice);
    } else if (this.mainPage === 'billiard-info') {
      resp = await this.apiService.deleteBilliardInfo(notice);
    }

    if (resp.status) {
      this.movePage('list');
    } else {
    }
  }
}
