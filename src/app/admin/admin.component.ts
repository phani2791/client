import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  constructor(private  router: Router) {
    this.router.navigate(['/admin/home']);

  }

  navigate(path) {
    this.router.navigate([path]);
  }
}
