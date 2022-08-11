import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './layouts/login/login.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { SharedModule } from './shared/shared.module';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    
    
    
    
    
    









  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ReactiveFormsModule,
    SharedModule,
   




  ],

  providers: [UserService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },],
    

  bootstrap: [AppComponent]
})
export class AppModule { }
