import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/services/intercepter';
import { BaseUrlInterceptor } from './core/services/baseUrl.intercepter';
import { RouterModule } from '@angular/router';
import { ViewsModule } from './views/views.module';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ViewsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
