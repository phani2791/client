import {NgModule}                from '@angular/core';
import {
  RouterModule,
  Routes
}                                from '@angular/router';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {HomeComponent}           from './home/home.component';
import {LoginComponent}          from './login/login.component';
import {PreloginComponent}       from './prelogin.component';
import {SignupComponent}         from './signup/signup.component';

const preLoginRoutes: Routes = [
  {
    path: 'home',
    component: PreloginComponent,
    children: [
      {path: 'signup', component: SignupComponent},
      {
        path: 'login', component: LoginComponent
      }, {
        path: 'forgotpassword', component: ForgotpasswordComponent
      },
      {path: '', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(preLoginRoutes)],
  exports: [RouterModule]
})
export class PreloginRoutingModule {
}
