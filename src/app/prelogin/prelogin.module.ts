import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {FormlyModule} from '@ngx-formly/core';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PreloginRoutingModule} from './prelogin-routing.module';
import {PreloginComponent} from './prelogin.component';
import {SignupComponent} from './signup/signup.component';
import {ApiService} from '../services/api.service';
import {BrowserService} from '../services/browser.service';
import {StorageService} from '../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    PreloginRoutingModule
  ],
  declarations: [
    PreloginComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ForgotpasswordComponent
  ],
  providers: [
    ApiService,
    BrowserService,
    StorageService
  ]
})
export class PreLoginModule {
}
