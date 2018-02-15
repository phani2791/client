import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {AuthService} from '../auth.service';
import {StorageService} from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.


    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    let options = {};
    if (this.auth.getJwtFlag(req)) {
      options = {
        setHeaders: {
          Authorization: this.storageService.session.getItem('token') ? `Bearer ${this.storageService.session.getItem('token')}` : ''
        }
      }
    }
    const authReq = req.clone(options);

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}


// import { Observable } from 'rxjs/Observable';
//
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add authorization header with jwt token if available
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser && currentUser.token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     }
//
//     return next.handle(request);
//   }
// }
