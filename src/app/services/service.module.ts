import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginGuardGuard, SettingsService, SharedService, SidebarService, SubirArchivoService, UsuarioService} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers:
    [
      SettingsService,
      SharedService, SidebarService, ServiceModule, UsuarioService, LoginGuardGuard, SubirArchivoService, ModalUploadService
    ]
})
export class ServiceModule {
}
