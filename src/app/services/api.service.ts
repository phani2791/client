import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Injectable()
export class ApiService {

  myParams: any;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
    console.log(environment)
  }

  extendObject(obj, src) {
    Object.keys(src).forEach(function (key) {
      obj[key] = src[key];
    });
    return obj;
  }

  get(params, endpoint): Promise<{}> {
    const
      headers = new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.storageService.session.getItem('token')
        });
    if (params) {
      let myParams = new URLSearchParams();
      myParams = this.extendObject(myParams, params)
    }
    const options = new RequestOptions({headers: headers, params: this.myParams});
    return this
      .http
      .get(environment.services.serverApi + endpoint, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  post(data, endpoint): Promise<{}> {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.session.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      });
    const options = new RequestOptions({headers: headers});
    return this
      .http
      .post(environment.services.serverApi + endpoint, data, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  put(data, endpoint): Promise<{}> {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.session.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      });
    const options = new RequestOptions({headers: headers});
    return this
      .http
      .put(environment.services.serverApi + endpoint, data, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  private extractData(res: Response) {
    const body = res.json();
    // console.log(body)
    return body || {};
  }

  private handleErrorPromise(error: Response | any) {
    console.log(error);
    return Promise.reject(error.message || error);

  }

  private redirect(error) {
    this.router.navigate(['/']);
    return Promise.reject(error.message || error);
  }

}
