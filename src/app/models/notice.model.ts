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

export interface NoticeState {
  noticies: Notice[];
  selectedNotice: Notice;
  currentPage: Number;
}
