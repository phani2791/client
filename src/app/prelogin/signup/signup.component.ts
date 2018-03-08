import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  userFields: FormlyFieldConfig[] = [
    {
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
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Must be at least 3 characters',
        required: true,
        minLength: 3
      }
    },
    {
      key: 'passwordConfirm',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Please re-enter your password',
        required: true
      },
      validators: {
        fieldMatch: {
          expression: (control) => control.value === this.model.password,
          message: 'Password Not Matching'
        }
      },
      expressionProperties: {
        'templateOptions.disabled': () => !this.form.get('password').valid
      }
    }
  ];

  submit(user) {
    this.api.signUp('/users', this.model).subscribe(result => console.log(result));
  }

  ngOnInit() {
  }

}
