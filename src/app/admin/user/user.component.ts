import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ConfigService} from '../../services/config.service';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfigService],
})
export class UserComponent implements OnInit {
  tableConfig;
  columns = [
    {key: 'email', title: 'Email'},
    {key: 'name', title: 'Name'},
    {key: 'role', title: 'Role'}
  ];
  data = [];
  opened = false;


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
    this.api.signUp('/users', this.model).subscribe(result => console.log(result));
  }

  constructor(private  api: ApiService) {
    this.api.get('/users', {}).toPromise().then(data => {
      this.data = data['rows'];
    }).catch(err => {
      console.log(err)
    })
  }

  _toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.tableConfig = ConfigService.tableConfig;
  }

}
