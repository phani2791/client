import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  getAuthorizationToken() {
    return 'VaB9rNW9iAmel3oIwZF3dgPJUaWNL0rI';
  }

  getJwtFlag(req) {
    return req.body ? !req.body.includes('access_token') : true;
  }

}
