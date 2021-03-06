import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './services/http/auth-guard.service';
import {CanDeactivateGuard} from './services/http/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/prelogin/prelogin.module#PreLoginModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/pagenotfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {
}
