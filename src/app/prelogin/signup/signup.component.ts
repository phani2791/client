import {
  Component,
  OnInit
}                  from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions
}                  from '@ngx-formly/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() {
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
      }
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
    console.log(user);
  }

  ngOnInit() {
  }

}