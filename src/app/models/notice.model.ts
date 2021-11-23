export class Notice {
  id: string;
  subject: string;
  contents: any;
  creationUser: string;
  creationDate: any;
  comment: number;
  created: any;
  total: number;
  modified: any;
  viewCount: number;
  coverSource: string;
}

export class Comment {
  constructor(
    id: string = null,
    contents: string = null,
    parentId: string = null,
    noticeId = null
  ) {
    this.id = id;
    this.contents = contents;
    this.parentId = parentId;
    this.noticeId = noticeId;
  }
  id: string;
  contents: string;
  parentId: string;
  noticeId: string;
  created: any;
  modified: any;
  total: number;
  replyList: Array<any>;
  replyCount: number;
  more: boolean;
  checked: boolean;
  commentCount: number;
}

export interface NoticeState {
  noticies: Notice[];
  comments: Comment[];
  // selectedNotice: Notice;
  // currentPage: Number;
}
