import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {FormlyModule} from '@ngx-formly/core';
import {SidebarModule} from 'ng-sidebar';
import {TableModule} from 'ngx-easy-table';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressRouterModule} from '@ngx-progressbar/router';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {ReactiveFormsModule} from '@angular/forms';
import {UserhomeComponent} from './userhome/userhome.component';
import {UserAuthGaurdService} from './user-auth-gaurd.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    FormlyModule.forRoot(),
    NgProgressModule.forRoot(
      {
        spinner: false,
        color: '#8CC152',
        thick: true
      }
    ),
    NgProgressHttpModule,
    NgProgressRouterModule,
    TableModule
  ],
  declarations: [UserhomeComponent],
  providers: [UserAuthGaurdService]
})
export class UserModule { }
