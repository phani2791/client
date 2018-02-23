import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  constructor(private  router: Router, private storageService: StorageService) {
    this.router.navigate(['/admin/home']);
  }

  navigate(path) {
    if (path === '/home') {
      this.storageService.session.clear()
    }
    this.router.navigate([path]);
  }
}
