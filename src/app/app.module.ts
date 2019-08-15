import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas 
import { APP_ROUTES } from './app.routes';
//modulos


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from './services/service.index';
import { ServiceModule } from './services/service.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {SelectModule} from 'ng2-select';
import { registerLocaleData } from '@angular/common';

import locale_esMX from '@angular/common/locales/es-MX';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
registerLocaleData(locale_esMX, 'es-MX');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    //PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NoopAnimationsModule,
    SelectModule,
    SharedModule

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
