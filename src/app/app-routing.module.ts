import {NgModule}              from '@angular/core';
import {
  RouterModule,
  Routes
}                              from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/prelogin/prelogin.module#PreLoginModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
