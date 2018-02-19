import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {AuthService} from '../auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ApiService {
  private baseUrl;
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler,
              private auth: AuthService) {
    this.handleError = httpErrorHandler.createHandleError('ApiService');
    this.baseUrl = environment.serverUrl.basePath
  }

  const
  authToken = 'access_token=' + this.auth.getAuthorizationToken();

  formatData(obj) {
    let s = '';
    for (const u in obj) {
      s += `${u}=${obj[u]}&`;
    }
    s = s + this.authToken;
    return s
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  signUp(endPoint, user): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    return this.http.post<any>(this.baseUrl + endPoint, this.formatData(user), options)
      .pipe(
        catchError(this.handleError('post', user))
      );
  }

  login(endPoint, user): Observable<any> {
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
        })
      }
    ;
    const url = this.baseUrl + endPoint;
    return this.http.post<any>(url, this.authToken, options)
  }

  get(endPoint, params): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + endPoint)
      .pipe(
        catchError(this.handleError('get', []))
      );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
