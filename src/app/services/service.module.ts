import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';
import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import { UsuarioService } from './usuario/usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';


@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers:
    [
      SettingsService,
      SharedService, SidebarService, ServiceModule, UsuarioService, LoginGuardGuard,
       SubirArchivoService, ModalUploadService,AdminGuard,VerificaTokenGuard
    ]
})
export class ServiceModule {
}
