import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {FormlyModule} from '@ngx-formly/core';
import {AdminModule} from './admin/admin.module';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PreLoginModule} from './prelogin/prelogin.module';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {AuthService} from './services/http/auth.service';
import {HttpErrorHandler} from './services/http/http-error-handler.service';
import {MessageService} from './services/http/message.service';
import {RequestCache, RequestCacheWithMap} from './services/http/request-cache.service';
import {httpInterceptorProviders} from './services/http/http-interceptors';
import {MessagesComponent} from './services/http/messages/messages.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageService} from './services/storage.service';
import {BrowserService} from './services/browser.service';
import {TableModule} from 'ngx-easy-table';
import {SidebarModule} from 'ng-sidebar';
import {ConfigService} from './services/config.service';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressRouterModule} from '@ngx-progressbar/router';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    NgProgressModule.forRoot(
      {
        spinner: false,
        color: '#8CC152',
        thick: true
      }
    ),
    NgProgressHttpModule,
    NgProgressRouterModule,
    FormlyBootstrapModule,
    PreLoginModule,
    TableModule,
    SidebarModule.forRoot(),
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    BrowserService,
    StorageService,
    ConfigService,
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent,
    PageNotFoundComponent]
})
export class AppModule {
}
