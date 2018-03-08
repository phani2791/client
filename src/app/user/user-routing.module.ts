import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserhomeComponent} from './userhome/userhome.component';
import {UserAuthGaurdService} from './user-auth-gaurd.service';

const routes: Routes = [
  {
    path: 'user',
    component: UserhomeComponent,
    canActivate: [UserAuthGaurdService],
    children: [
      {path: 'home', component: UserhomeComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
