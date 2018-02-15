import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser
  form = new FormGroup({});
  userModel = {email: 'admin@mailinator.com', password: 'thebest1'};
  userFields: Array<FormlyFieldConfig> = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email',
      required: true
    }
  }, {
    key: 'password',
    type: 'input',
    templateOptions: {
      type: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      required: true
    }
  }];

  constructor(private router: Router, private api: ApiService, private storageService: StorageService) {
  }

  submit() {
    this.api.login('/auth', this.userModel).subscribe(result => {
      console.log(result);
      this.storageService.session.setItem('token', result.token);
      if (result.user.role === 'admin') {
        this.router.navigate(['/admin/home'])
      } else {
        this.router.navigate(['/user/home'])
      }
    });
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  getAllUsers() {
    this.api.allUsers('/users', {}).subscribe(result => console.log(result));
  }

  getMe() {
    this.api.allUsers('/users/me', {}).subscribe(result => this.currentUser = result);
  }
  ngOnInit() {
  }

}
