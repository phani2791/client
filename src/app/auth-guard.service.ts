import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {StorageService} from './services/storage.service';
import {ApiService} from './services/api.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router, private storageService: StorageService, private apiService: ApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!(this.storageService.session.getItem('token')) && /^\/home/i.test(url)) {
      return true;
    } else {
      this.checkSession(url);
    }

  }

  async checkSession(url: string) {
    const response = await this.apiService.get('/users/me', {});
    return response.toPromise().then(data => {
      if ((data['role'] === 'admin') && /^\/home/i.test(url)) {
        this.router.navigate(['/admin/home']);
        return true;
      } else {
        this.router.navigate(['/home/login']);
        return true;
      }
    })
  }
}
