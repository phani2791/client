import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

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
    }, validators: {
      email: {
        expression: (c) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value),
        message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid Email Address`,
      },
    },
  }];
  options: FormlyFormOptions = {};
  constructor(private  router: Router) {
  }

  ngOnInit() {
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  submit(user) {
    console.log(user);
  }

}
