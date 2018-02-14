import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({});
  userModel = {};
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

  constructor(private router: Router, private api: ApiService) {
    console.log(this.api)
  }

  submit(user) {
    console.log(user);
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  ngOnInit() {
  }

}
