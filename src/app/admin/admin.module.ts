import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminAuthGuard} from './admin-gaurd.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminHomeComponent, AdminComponent],
  providers: [AdminAuthGuard]
})
export class AdminModule {
}
