import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const REST_SERVICE_URL = 'http://localhost:8090';
const FREE_SERVICE_PATH = '/free';
const API_SERVICE_PATH = '/rest';

@Injectable()
// providedIn: 'root'
export class ApiService {
  constructor(public http: HttpClient) {}

  public callApi(
    url: string,
    method: string,
    params: any,
    data: any
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    if (method === 'get') {
      return this.http.get(url, { headers });
    } else {
      return this.http.post(url, JSON.stringify(data), { headers });
    }
  }

  getBilliaiInfos(currentPage: number, itemsPerPage: number = 12) {
    return this.callApi(
      REST_SERVICE_URL +
        API_SERVICE_PATH +
        '/getBilliaiInfos/' +
        currentPage +
        '/' +
        itemsPerPage,
      'get',
      null,
      null
    );
  }
  setBilliaiInfo(BillaiInfo: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/setBilliaiInfo',
        'post',
        null,
        BillaiInfo
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  updateBilliaiInfoViewCount(id: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL +
          API_SERVICE_PATH +
          '/updateBilliaiInfoViewCount/' +
          id,
        'post',
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteBilliaiInfo(BillaiInfo: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/deleteBilliaiInfo',
        'post',
        null,
        BillaiInfo
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getBilliardInfos(currentPage: number, itemsPerPage: number = 12) {
    return this.callApi(
      REST_SERVICE_URL +
        API_SERVICE_PATH +
        '/getBilliardInfos/' +
        currentPage +
        '/' +
        itemsPerPage,
      'get',
      null,
      null
    );
  }
  setBilliardInfo(BillardInfo: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/setBilliardInfo',
        'post',
        null,
        BillardInfo
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  updateBilliardInfoViewCount(id: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL +
          API_SERVICE_PATH +
          '/updateBilliardInfoViewCount/' +
          id,
        'post',
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteBilliardInfo(BillardInfo: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/deleteBilliardInfo',
        'post',
        null,
        BillardInfo
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getEvents(currentPage: number, itemsPerPage: number = 12): Observable<any> {
    return this.callApi(
      REST_SERVICE_URL +
        API_SERVICE_PATH +
        '/getEvents/' +
        currentPage +
        '/' +
        itemsPerPage,
      'get',
      null,
      null
    );
  }
  setEvent(event: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/setEvent',
        'post',
        null,
        event
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  updateEventViewCount(id: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/updateEventViewCount/' + id,
        'post',
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteEvent(event: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/deleteEvent',
        'post',
        null,
        event
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getComments(noticeId: string, pageNum: number = 0) {
    return this.callApi(
      REST_SERVICE_URL +
        API_SERVICE_PATH +
        '/getComments/' +
        noticeId +
        '/' +
        pageNum,
      'get',
      null,
      null
    );
  }
  getReplies(commentId: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/getReplies/' + commentId,
        'get',
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  setComment(comment: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/setComment',
        'post',
        null,
        comment
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteComment(comment: any) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + API_SERVICE_PATH + '/deleteComment',
        'post',
        null,
        comment
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
