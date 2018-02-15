import {Injectable} from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {


  getAuthorizationToken() {
    return 'VaB9rNW9iAmel3oIwZF3dgPJUaWNL0rI';
  }

  getJwtFlag(req) {
    return req.body ? !req.body.includes('access_token') : true;
  }

}
