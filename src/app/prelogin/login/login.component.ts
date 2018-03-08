import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  userModel = {email: 'admin@mailinator.com', password: 'thebest1'};
  userFields: Array<FormlyFieldConfig> = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email',
      required: true
    },
    validators: {
      email: {
        expression: (c) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value),
        message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid Email Address`,
      },
    },
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

  constructor(private router: Router, private api: ApiService, private storageService: StorageService, private toastr: ToastrService) {
  }

  submit() {
    this.api.login('/auth', this.userModel).subscribe(result => {
      this.storageService.session.setItem('token', result.token);
      if (result.user.role === 'admin') {
        this.toastr.success('', 'Welcome back Admin')
        this.router.navigate(['/admin/home'])
      } else {
        this.toastr.success('', 'Welcome back User')
        this.router.navigate(['/user/home'])
      }
    });
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  getAllUsers() {
    this.api.get('/users', {}).subscribe(result => console.log(result));
  }

  getMe() {
    this.api.get('/users/me', {}).subscribe(result => this.currentUser = result);
  }
  ngOnInit() {
  }

}
