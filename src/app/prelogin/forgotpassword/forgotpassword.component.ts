import {
  Component,
  OnInit
}                          from '@angular/core';
import {FormGroup}         from '@angular/forms';
import {Router}            from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';

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
    }
  }];

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
