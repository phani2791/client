import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminAuthGuard} from './admin-gaurd.service';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {path: 'home', component: AdminHomeComponent},
      {path: 'users', component: UserComponent},
      {path: 'admin', component: AdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
