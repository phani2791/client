import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminAuthGuard} from './admin-gaurd.service';
import {UserComponent} from './user/user.component';
import {SidebarModule} from 'ng-sidebar';
import {TableModule} from 'ngx-easy-table';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressRouterModule} from '@ngx-progressbar/router';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
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
  declarations: [AdminHomeComponent, AdminComponent, UserComponent],
  providers: [AdminAuthGuard]
})
export class AdminModule {
}
